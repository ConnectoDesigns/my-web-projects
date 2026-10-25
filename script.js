// LocalStorage se posts load karna ya default sample post rakhna
let posts = JSON.parse(localStorage.getItem('blog_posts')) || [
    {
        id: Date.now(),
        title: 'Welcome to My Blog Platform',
        author: 'Admin',
        date: new Date().toLocaleDateString(),
        content: 'Web development is changing faster than ever. As we look into the trends of 2026, technologies like Artificial Intelligence integrations, advanced browser capabilities, and optimized CSS frameworks are shaping the way modern web applications are built. Understanding semantic HTML, modular CSS layouts, and clean dynamic JavaScript remains the fundamental building block for every developer aiming to build scalable user interfaces .'
    }
];

const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const adminPostsTable = document.getElementById('admin-posts-table');
const editIndexInput = document.getElementById('edit-index');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Section Switcher
function showSection(sectionName) {
    const homeSection = document.getElementById('home-section');
    const adminSection = document.getElementById('admin-section');
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => btn.classList.remove('active'));

    if (sectionName === 'home') {
        homeSection.style.display = 'block';
        adminSection.style.display = 'none';
        navBtns[0].classList.add('active');
        renderPosts();
    } else {
        homeSection.style.display = 'none';
        adminSection.style.display = 'block';
        navBtns[1].classList.add('active');
        renderAdminPosts();
    }
}

// LocalStorage me save karna
function saveToLocalStorage() {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
}

// Home feed par posts render karna
function renderPosts() {
    postsContainer.innerHTML = '';
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No blog posts available yet.</p>';
        return;
    }

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-meta">By <strong>${post.author}</strong> on ${post.date}</div>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Admin panel me posts render karna
function renderAdminPosts() {
    adminPostsTable.innerHTML = '';
    if (posts.length === 0) {
        adminPostsTable.innerHTML = '<p>No posts to manage.</p>';
        return;
    }

    posts.forEach((post, index) => {
        const div = document.createElement('div');
        div.className = 'admin-post-item';
        div.innerHTML = `
            <span><strong>${post.title}</strong> (${post.author})</span>
            <div class="admin-post-actions">
                <button class="edit-btn" onclick="editPost(${index})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
            </div>
        `;
        adminPostsTable.appendChild(div);
    });
}

// Form Submit (Create or Update)
postForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const content = document.getElementById('post-content').value;
    const editIndex = editIndexInput.value;

    if (editIndex === '') {
        // Create new post
        const newPost = {
            id: Date.now(),
            title,
            author,
            date: new Date().toLocaleDateString(),
            content
        };
        posts.unshift(newPost);
    } else {
        // Update existing post
        posts[editIndex].title = title;
        posts[editIndex].author = author;
        posts[editIndex].content = content;
        resetForm();
    }

    saveToLocalStorage();
    postForm.reset();
    renderPosts();
    renderAdminPosts();
});

// Edit Post function
function editPost(index) {
    const post = posts[index];
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-author').value = post.author;
    document.getElementById('post-content').value = post.content;
    editIndexInput.value = index;

    saveBtn.textContent = 'Update Post';
    cancelBtn.style.display = 'inline-block';
}

// Delete Post function
function deletePost(index) {
    if (confirm('Kya aap waqai is post ko delete karna chahte hain?')) {
        posts.splice(index, 1);
        saveToLocalStorage();
        renderPosts();
        renderAdminPosts();
    }
}

// Reset Form
function resetForm() {
    postForm.reset();
    editIndexInput.value = '';
    saveBtn.textContent = 'Publish Post';
    cancelBtn.style.display = 'none';
}

// Page load hone par default render
renderPosts();
renderAdminPosts();
