const router = require('express').Router();
const sequelize = require('../config/connections');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res)=> {
    try {
        // Get all projects and JOIN with user data
        const post = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            
                attributes: [
                    'id', 'textbody', 'title', 'createdAt',
                ],

            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', user_id, 'createdAt'],
                    include: {
                        model: User,
                        attributes: [username]
                    },
                },
            ],

        });
        const posts = post.map(post => post.get({plain:true}));
        console.log(posts)

        res.render('dashboard', {
            posts,
            loggedIn: req.session.logged_in,
            userName: req.session.username,
        });
    } catch(err) {
        res.status(500).json(err);
    }
    
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await post.findByPk(req.params.id, {
            attributes: [
                'id', 'comment_text', 'post_id', 'user_id', 'createdAt'
            ],
            include: {
                model: User,
                attributes: [username],
            }
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('editPost', {
            posts,
            loggedIn: req.session.logged_in,
            userName: req.session.username
        })

    } catch (err) {
        res.status(500).json(err)
    };
});


module.exports = router