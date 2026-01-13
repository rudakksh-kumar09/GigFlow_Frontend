import Gig from '../models/Gig.js';

export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: 'open' })
      .populate('ownerId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      gigs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json({
      success: true,
      gig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
