import mongoose from 'mongoose';
import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import User from '../models/User.js';

export const submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'This gig is no longer accepting bids' });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot bid on your own gig' });
    }

    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    if (existingBid) {
      return res.status(400).json({ message: 'You have already bid on this gig' });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json({
      success: true,
      bid,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    const gigOwnerId = gig.ownerId._id ? gig.ownerId._id.toString() : gig.ownerId.toString();
    if (gigOwnerId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view bids' });
    }

    const bids = await Bid.find({ gigId })
      .populate('freelancerId', 'name email')
      .sort({ createdAt: -1 });

    const formattedBids = bids.map((bid) => ({
      _id: bid._id,
      gigId: bid.gigId,
      freelancerId: bid.freelancerId._id,
      freelancerName: bid.freelancerId.name,
      freelancerEmail: bid.freelancerId.email,
      message: bid.message,
      price: bid.price,
      status: bid.status,
      createdAt: bid.createdAt,
    }));

    res.status(200).json({
      success: true,
      bids: formattedBids,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireFreelancer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Bid not found' });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Gig not found' });
    }

    const gigOwnerId = gig.ownerId._id ? gig.ownerId._id.toString() : gig.ownerId.toString();
    const currentUserId = req.user._id.toString();
    
    if (gigOwnerId !== currentUserId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ 
        message: 'Not authorized to hire for this gig'
      });
    }

    if (gig.status !== 'open') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'This gig has already been assigned' });
    }

    gig.status = 'assigned';
    await gig.save({ session });

    bid.status = 'hired';
    await bid.save({ session });

    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
        status: 'pending',
      },
      { status: 'rejected' },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    const io = req.app.get('io');
    const freelancer = await User.findById(bid.freelancerId);
    
    io.to(bid.freelancerId.toString()).emit('hired', {
      gigId: gig._id,
      gigTitle: gig.title,
      message: `You have been hired for "${gig.title}"!`,
    });

    res.status(200).json({
      success: true,
      message: 'Freelancer hired successfully',
      gig,
      bid,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

export const getUserBids = async (req, res) => {
  try {
    const mySubmittedBids = await Bid.find({ freelancerId: req.user._id })
      .populate('gigId', 'title budget status ownerId')
      .sort({ createdAt: -1 });

    const formattedSubmittedBids = mySubmittedBids.map((bid) => ({
      _id: bid._id,
      gigId: bid.gigId._id,
      gigTitle: bid.gigId.title,
      gigBudget: bid.gigId.budget,
      gigStatus: bid.gigId.status,
      message: bid.message,
      price: bid.price,
      status: bid.status,
      createdAt: bid.createdAt,
    }));

    const myGigs = await Gig.find({ ownerId: req.user._id });
    const gigIds = myGigs.map(gig => gig._id);
    
    const myReceivedBids = await Bid.find({ gigId: { $in: gigIds } })
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title budget status')
      .sort({ createdAt: -1 });

    const formattedReceivedBids = myReceivedBids.map((bid) => ({
      _id: bid._id,
      gigId: bid.gigId._id,
      gigTitle: bid.gigId.title,
      gigBudget: bid.gigId.budget,
      gigStatus: bid.gigId.status,
      freelancerId: bid.freelancerId._id,
      freelancerName: bid.freelancerId.name,
      freelancerEmail: bid.freelancerId.email,
      message: bid.message,
      price: bid.price,
      status: bid.status,
      createdAt: bid.createdAt,
    }));

    return res.status(200).json({
      success: true,
      submittedBids: formattedSubmittedBids,
      receivedBids: formattedReceivedBids,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
