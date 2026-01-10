// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project Detail Modal
    const viewProjectLinks = document.querySelectorAll('.view-project');
    const projectDetails = document.querySelector('.project-details');
    const projectDetailItems = document.querySelectorAll('.project-detail-item');
    const closeDetailBtns = document.querySelectorAll('.close-detail');
    
    viewProjectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project ID
            const projectId = this.getAttribute('href').substring(1);
            
            // Show project details container
            projectDetails.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Show specific project detail
            document.getElementById(projectId).classList.add('active');
        });
    });
    
    closeDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hide project details container
            projectDetails.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Hide all project details
            projectDetailItems.forEach(item => {
                item.classList.remove('active');
            });
        });
    });
    
    // Close modal when clicking outside
    projectDetails.addEventListener('click', function(e) {
        if (e.target === projectDetails) {
            projectDetails.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Hide all project details
            projectDetailItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Thumbnail Image Gallery
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
    const thumbnailVideos = document.querySelectorAll('.thumbnail-images video');
    
    thumbnailImages.forEach(img => {
        img.addEventListener('click', function() {
            // Get parent detail item
            const detailItem = this.closest('.project-detail-item');
            
            // Get main image container
            const mainImageContainer = detailItem.querySelector('.main-image');
            
            // Replace any video with image
            if (mainImageContainer.querySelector('video')) {
                const newImg = document.createElement('img');
                newImg.src = this.src;
                newImg.alt = this.alt;
                mainImageContainer.innerHTML = '';
                mainImageContainer.appendChild(newImg);
            } else {
                // Get main image
                const mainImage = mainImageContainer.querySelector('img');
                
                // Swap images
                const tempSrc = mainImage.src;
                mainImage.src = this.src;
            }
            
            // Add animation
            const mainElement = mainImageContainer.querySelector('img, video');
            mainElement.style.animation = 'none';
            setTimeout(() => {
                mainElement.style.animation = 'fadeIn 0.3s ease-out forwards';
            }, 10);
        });
    });
    
    // Handle video thumbnails
    thumbnailVideos.forEach(video => {
        video.addEventListener('click', function() {
            // Get parent detail item
            const detailItem = this.closest('.project-detail-item');
            
            // Get main image container
            const mainImageContainer = detailItem.querySelector('.main-image');
            
            // Replace image with video
            const newVideo = document.createElement('video');
            newVideo.src = this.src;
            newVideo.controls = true;
            newVideo.autoplay = true;
            newVideo.muted = false;
            newVideo.style.width = '100%';
            newVideo.style.height = '100%';
            newVideo.style.objectFit = 'contain';
            
            mainImageContainer.innerHTML = '';
            mainImageContainer.appendChild(newVideo);
            
            // Add animation
            newVideo.style.animation = 'fadeIn 0.3s ease-out forwards';
        });
    });
});