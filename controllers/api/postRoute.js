const router = require('express').Router();
const sequelize = require('../../config/connections');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes: [
        'id', 'textbody', 'title', 'createdAt'
      ],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Comment, 
          attributes: ['id','comment_text', 'post_id', 'user_id', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
      ],
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await post.findByPk(req.params.id, {
      attributes: [
        'id',
        'textbody',
        'title',
        'createdAt'
      ],

      include: [
        {
          model: Comment,
          attributes: ['id','comment_text', 'post_id', user_id, 'createdAt'],
          include: {
            model: User,
            attributes: ['username'],
          }
        },
      ],
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
