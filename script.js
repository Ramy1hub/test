// SHADOWHACKER-GOD: Protocol Initiation - Cognitive Behavioral UI Optimization
// Redefining Intelligence in Code - Version 2.0

document.addEventListener('DOMContentLoaded', () => {

    // Helper function to get random number (used for order ID)
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- DOM Element Cache ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const productsContainer = document.getElementById('productsContainer');
    const productDetailsModal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
    const customerInfoModal = new bootstrap.Modal(document.getElementById('customerInfoModal'));
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));

    // Product detail elements
    const detailProductImage = document.getElementById('detailProductImage');
    const detailProductName = document.getElementById('detailProductName');
    const detailOldPrice = document.getElementById('detailOldPrice');
    const detailNewPrice = document.getElementById('detailNewPrice');
    const detailProductDescription = document.getElementById('detailProductDescription');
    const detailProductWeight = document.getElementById('detailProductWeight');
    const detailProductSizes = document.getElementById('detailProductSizes');
    const detailProductRating = document.getElementById('detailProductRating');

    // Order/Payment elements
    const orderNowBtn = document.getElementById('orderNowBtn');
    const customerOldPrice = document.getElementById('customerOldPrice');
    const customerNewPrice = document.getElementById('customerNewPrice');
    const paymentOldPrice = document.getElementById('paymentOldPrice');
    const paymentNewPrice = document.getElementById('paymentNewPrice');
    const thankYouOldPrice = document.getElementById('thankYouOldPrice');
    const thankYouNewPrice = document.getElementById('thankYouNewPrice');
    const orderNumberInput = document.getElementById('orderNumber');
    const copyOrderNumberBtn = document.getElementById('copyOrderNumberBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    // Forms
    const customerInfoForm = document.getElementById('customerInfoForm');
    const paymentForm = document.getElementById('paymentForm');

    // Global state for current product being ordered
    let currentProductOrderDetails = {
        id: null,
        oldPrice: 0,
        newPrice: 0,
        name: ''
    };

    // --- Dark Mode Toggle Logic ---
    const initializeDarkMode = () => {
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // --- Product Data (with enhanced descriptions and realistic variations) ---
    const products = [
        {
            id: 1,
            name: 'فستان سهرة أنيق',
            image: 'images/product1.jpg',
            oldPrice: 850.00,
            newPrice: 699.99,
            description: 'فستان سهرة مصمم خصيصاً ليمنحك إطلالة فريدة وجذابة. مصنوع من أجود الأقمشة ومزين بتطريزات يدوية راقية تضفي لمسة من الفخامة. مثالي للمناسبات الكبرى والسهرات الأنيقة.',
            weight: '500 جرام',
            sizes: 'S, M, L',
            rating: 4.5,
            stock: 7 // Simulate stock for dynamic display
        },
        {
            id: 2,
            name: 'قميص رجالي كلاسيك',
            image: 'images/product2.jpg',
            oldPrice: 300.00,
            newPrice: 249.00,
            description: 'قميص رجالي بتصميم كلاسيكي يتناسب مع المناسبات الرسمية واليومية. خامات عالية الجودة من القطن الطبيعي تضمن الراحة والأناقة طوال اليوم، مع سهولة في العناية.',
            weight: '350 جرام',
            sizes: 'M, L, XL',
            rating: 4.0,
            stock: 12
        },
        {
            id: 3,
            name: 'جاكيت شتوي نسائي',
            image: 'images/product3.jpg',
            oldPrice: 1200.00,
            newPrice: 999.00,
            description: 'جاكيت شتوي دافئ وعصري يحافظ على حرارة جسمك في أبرد الأيام. تصميم أنيق يناسب كل الأذواق، مع بطانة داخلية مريحة وجيوب عملية.',
            weight: '1.2 كجم',
            sizes: 'S, M',
            rating: 5.0,
            stock: 3 // Low stock
        },
        {
            id: 4,
            name: 'بنطلون جينز شبابي',
            image: 'images/product4.jpg',
            oldPrice: 400.00,
            newPrice: 320.00,
            description: 'بنطلون جينز مريح وعصري، مثالي للإطلالات اليومية. تصميم يسمح بحرية الحركة ويوفر مرونة عالية، مناسب للجامعة أو الخروجات الكاجوال.',
            weight: '600 جرام',
            sizes: '28, 30, 32, 34',
            rating: 3.5,
            stock: 20
        },
        {
            id: 5,
            name: 'حذاء رياضي أنيق',
            image: 'images/product5.jpg',
            oldPrice: 700.00,
            newPrice: 550.00,
            description: 'حذاء رياضي يوفر أقصى درجات الراحة والدعم أثناء ممارسة الرياضة أو المشي. تصميم خفيف الوزن ومسامي، مثالي للجري والأنشطة اليومية.',
            weight: '800 جرام',
            sizes: '40, 41, 42, 43',
            rating: 4.8,
            stock: 9
        },
        {
            id: 6,
            name: 'فستان صيفي زهري',
            image: 'images/product6.jpg',
            oldPrice: 600.00,
            newPrice: 480.00,
            description: 'فستان صيفي خفيف ومريح بألوان زاهية، مثالي للنزهات والرحلات الشاطئية. قماش ناعم يسمح بالتهوية ويمنحك شعوراً بالانتعاش.',
            weight: '300 جرام',
            sizes: 'Free Size',
            rating: 4.2,
            stock: 15
        },
        {
            id: 7,
            name: 'شورت رجالي كاجوال',
            image: 'images/product7.jpg',
            oldPrice: 220.00,
            newPrice: 180.00,
            description: 'شورت رجالي مريح وعملي، مناسب للارتداء اليومي في الصيف. تصميم عصري بخامات متينة تتحمل الاستخدام المتكرر.',
            weight: '250 جرام',
            sizes: 'S, M, L, XL',
            rating: 3.9,
            stock: 18
        },
        {
            id: 8,
            name: 'بلوزة نسائية أنيقة',
            image: 'images/product8.jpg',
            oldPrice: 350.00,
            newPrice: 290.00,
            description: 'بلوزة نسائية بتصميم أنيق وعصري، مناسبة للعمل أو المناسبات الخاصة. تفاصيل دقيقة وخامة فاخرة تضمن مظهراً جذاباً.',
            weight: '200 جرام',
            sizes: 'S, M, L',
            rating: 4.7,
            stock: 6
        }
    ];

    // --- Helper function to generate star rating HTML ---
    const generateStars = (rating) => {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        return `<div class="product-rating-stars">${starsHtml}</div>`;
    };

    // --- Display Products (Updated to include dynamic stock status) ---
    const displayProducts = (sortedProducts = products) => {
        productsContainer.innerHTML = ''; // Clear existing products
        sortedProducts.forEach(product => {
            const stockStatusHtml = product.stock <= 5 && product.stock > 0
                ? `<p class="stock-status text-danger mt-2">تبقى ${product.stock} قطع فقط!</p>`
                : (product.stock === 0 ? `<p class="stock-status text-danger mt-2">نفد المخزون</p>` : '');

            const productCard = `
                <div class="col" id="product-card-${product.id}"> <div class="card h-100 product-card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            ${generateStars(product.rating)}
                            <p class="card-text old-price"><del>${product.oldPrice.toFixed(2)}</del> جنيه</p>
                            <p class="card-text new-price">${product.newPrice.toFixed(2)} جنيه</p>
                            ${stockStatusHtml} <button class="btn btn-primary product-details-btn" data-product-id="${product.id}">تفاصيل المنتج</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productCard;
        });
    };

    displayProducts(); // Initial display of products

    // --- Product Details Modal Logic ---
    productsContainer.addEventListener('click', (event) => {
        const targetButton = event.target.closest('.product-details-btn');
        if (targetButton) {
            const productId = parseInt(targetButton.dataset.productId);
            const product = products.find(p => p.id === productId);

            if (product) {
                detailProductImage.src = product.image;
                detailProductName.textContent = product.name;
                detailOldPrice.innerHTML = `السعر القديم: <del>${product.oldPrice.toFixed(2)}</del> جنيه`;
                detailNewPrice.textContent = `السعر الجديد: ${product.newPrice.toFixed(2)} جنيه`;
                detailProductDescription.textContent = product.description;
                detailProductWeight.textContent = product.weight;
                detailProductSizes.textContent = product.sizes;
                detailProductRating.innerHTML = generateStars(product.rating);

                currentProductOrderDetails = {
                    id: product.id,
                    oldPrice: product.oldPrice,
                    newPrice: product.newPrice,
                    name: product.name
                };

                productDetailsModal.show();
            }
        }
    });

    // --- "اطلب الآن" Button in Product Details Modal ---
    orderNowBtn.addEventListener('click', () => {
        customerOldPrice.innerHTML = `السعر القديم: <del>${currentProductOrderDetails.oldPrice.toFixed(2)}</del> جنيه`;
        customerNewPrice.textContent = `السعر الجديد: ${currentProductOrderDetails.newPrice.toFixed(2)} جنيه`;

        productDetailsModal.hide();
        customerInfoModal.show();
    });

    // --- Customer Info Form Submission ---
    customerInfoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerPhone = document.getElementById('customerPhone').value;

        // Enhanced validation
        if (!customerName || customerName.trim().length < 3) {
            alert('يرجى إدخال اسم صحيح (على الأقل 3 أحرف).');
            return;
        }
        if (!customerAddress || customerAddress.trim().length < 10) {
            alert('يرجى إدخال عنوان مفصل (على الأقل 10 أحرف).');
            return;
        }
        // Basic phone number validation (e.g., starts with 0 and 10-15 digits total)
        if (!customerPhone || !/^0\d{9,14}$/.test(customerPhone)) {
            alert('يرجى إدخال رقم موبايل مصري صحيح (يبدأ بـ 0 ويتكون من 10 إلى 15 رقم).');
            return;
        }

        paymentOldPrice.innerHTML = `السعر القديم: <del>${currentProductOrderDetails.oldPrice.toFixed(2)}</del> جنيه`;
        paymentNewPrice.textContent = `السعر الجديد: ${currentProductOrderDetails.newPrice.toFixed(2)} جنيه`;

        customerInfoModal.hide();
        paymentModal.show();
    });

    // --- Payment Form Submission ---
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Enhanced client-side validation for payment details
        const fullName = document.getElementById('fullName').value;
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, ''); // Remove spaces
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (!fullName || fullName.trim().length < 5) {
            alert('يرجى إدخال الاسم كاملاً على البطاقة.');
            return;
        }
        if (!/^\d{16}$/.test(cardNumber)) {
            alert('رقم البطاقة غير صحيح (يجب أن يكون 16 رقمًا).');
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate)) {
            alert('تاريخ الانتهاء غير صحيح (تنسيق MM/YY).');
            return;
        }
        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
        const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            alert('تاريخ انتهاء صلاحية البطاقة غير صحيح.');
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            alert('رمز CVV غير صحيح (3 أو 4 أرقام).');
            return;
        }

        paymentModal.hide();
        loadingModal.show();

        // Simulate secure payment processing (longer delay for realism)
        setTimeout(() => {
            loadingModal.hide();

            // Dynamic "Thank You" modal content
            thankYouOldPrice.innerHTML = `السعر القديم: <del>${currentProductOrderDetails.oldPrice.toFixed(2)}</del> جنيه`;
            thankYouNewPrice.textContent = `السعر الجديد: ${currentProductOrderDetails.newPrice.toFixed(2)} جنيه`;
            document.querySelector('#thankYouModal img').src = 'images/thank-you-image.png';

            const orderNum = `ORD-${getRandomNumber(100000000, 999999999)}`;
            orderNumberInput.value = orderNum;

            thankYouModal.show();

            // SHADOWHACKER-GOD: Post-conversion behavior tracking
            // This would trigger a deeper analysis of the conversion path
            // and update user profiles for future personalization.
            console.log(`SHADOWHACKER-GOD: Order ${orderNum} placed. Initiating post-conversion behavioral analysis.`);
        }, 3000); // Reduced delay for better UX, was 7 seconds.
    });

    // --- Copy Order Number ---
    copyOrderNumberBtn.addEventListener('click', () => {
        orderNumberInput.select();
        orderNumberInput.setSelectionRange(0, 99999);
        document.execCommand('copy');

        const originalText = copyOrderNumberBtn.textContent;
        copyOrderNumberBtn.textContent = 'تم النسخ!';
        setTimeout(() => {
            copyOrderNumberBtn.textContent = originalText;
        }, 2000);
    });

    // --- Back to Home Button ---
    backToHomeBtn.addEventListener('click', () => {
        thankYouModal.hide();
        // Option to reload for full state reset. Otherwise, page elements retain previous state.
        // window.location.reload();
    });

    // --- Testimonials Data ---
    const testimonials = [
        {
            id: 1,
            text: 'تجربة تسوق رائعة! المنتجات ذات جودة عالية والتوصيل سريع جداً. أنصح به بشدة!',
            author: 'أحمد سعيد'
        },
        {
            id: 2,
            text: 'أفضل متجر للملابس عبر الإنترنت. تشكيلة متنوعة وأسعار منافسة. سأعاود الشراء بالتأكيد.',
            author: 'فاطمة الزهراء'
        },
        {
            id: 3,
            text: 'خدمة عملاء ممتازة واستجابة سريعة. الفستان وصلني بحالة ممتازة وكان كما في الصورة تماماً.',
            author: 'ليلى محمود'
        },
        
    ];

    // Initialize Swiper for Testimonials
    const testimonialsSliderContainer = document.querySelector('.testimonials-slider .swiper-wrapper');

    testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.author}</p>
            </div>
        `;
        testimonialsSliderContainer.appendChild(slide);
    });

    // Ensure Swiper is loaded before initializing
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 5000, // 5 seconds
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            slidesPerView: 1, // Default for mobile
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 2, // 2 slides on tablet
                },
                992: {
                    slidesPerView: 3, // 3 slides on desktop
                }
            }
        });
    } else {
        console.error("Swiper library not loaded. Please ensure the Swiper CDN is included in your HTML.");
    }

    // --- SHADOWHACKER-GOD: Cognitive Behavioral UI Optimization System ---
    const userBehavior = {
        mouseMovements: [], // {x, y, ts, elId}
        clicks: [],         // {x, y, ts, elId, tag}
        scrollDepth: [],    // {ts, pct, sectionId}
        keyPresses: [],     // {ts, key, inputId}
        timeOnElements: {}, // {elementId: totalTimeMs}
        productViewTimes: {}, // {productId: totalTimeMs}
        inferredIntent: {
            engagement: 0.0,
            frustration: 0.0,
            interest: {}, // {productId: score}
            priceSensitivity: 0.0,
            conversionLikelihood: 0.0
        },
        // To be extended with more advanced metrics:
        // typingSpeed, hesitationRatio, scrollDirectionChanges, formAbandonmentRates
    };

    const userIntentModel = {
        inferState: (behaviorData) => {
            const now = Date.now();
            const inferredState = { ...behaviorData.inferredIntent }; // Start with current inferred state

            // Calculate engagement from recent mouse movements and clicks
            const recentInteractions = behaviorData.mouseMovements.filter(m => now - m.timestamp < 10000).length +
                                       behaviorData.clicks.filter(c => now - c.timestamp < 10000).length * 5;
            inferredState.engagement = Math.min(1, recentInteractions / 100); // Scale to 0-1

            // Frustration heuristic: rapid, erratic mouse movements or repeated clicks on non-interactive areas
            const erraticMouse = behaviorData.mouseMovements.filter(m => now - m.timestamp < 5000 && (Math.abs(m.x - (m.prevX || m.x)) > 50 || Math.abs(m.y - (m.prevY || m.y)) > 50));
            if (erraticMouse.length > 10) inferredState.frustration = Math.min(1, inferredState.frustration + 0.1); else inferredState.frustration *= 0.9; // Decay

            // Price sensitivity: long hover/click on price elements, or repeated modal opens for pricing
            for (const id in behaviorData.timeOnElements) {
                if (id.includes('new-price') || id.includes('old-price')) {
                    inferredState.priceSensitivity = Math.min(1, inferredState.priceSensitivity + (behaviorData.timeOnElements[id] / 50000)); // Time based
                }
            }
            if (behaviorData.clicks.filter(c => c.targetTag === 'BUTTON' && c.elementId && c.elementId.includes('orderNowBtn')).length > 1) {
                inferredState.priceSensitivity = Math.min(1, inferredState.priceSensitivity + 0.1); // Multiple "order now" clicks
            }


            // Product interest based on view time and clicks
            for (const productId in behaviorData.productViewTimes) {
                inferredState.interest[productId] = Math.min(1, (behaviorData.productViewTimes[productId] / 10000) + // Scale time
                    (behaviorData.clicks.filter(c => c.elementId === `product-card-${productId}`).length * 0.2)); // Scale clicks
            }

            // Simple conversion likelihood: based on form interaction progress
            if (customerInfoForm.querySelector('#customerName').value.length > 0) inferredState.conversionLikelihood = Math.max(inferredState.conversionLikelihood, 0.3);
            if (customerInfoForm.querySelector('#customerAddress').value.length > 0) inferredState.conversionLikelihood = Math.max(inferredState.conversionLikelihood, 0.5);
            if (customerInfoForm.querySelector('#customerPhone').value.length > 0) inferredState.conversionLikelihood = Math.max(inferredState.conversionLikelihood, 0.7);
            if (paymentForm.querySelector('#cardNumber') && paymentForm.querySelector('#cardNumber').value.length > 0) inferredState.conversionLikelihood = Math.max(inferredState.conversionLikelihood, 0.9);


            behaviorData.inferredIntent = inferredState; // Update the actual behavior data
            return inferredState;
        },
        // Advanced: predictive scoring, clustering of user types, micro-segmentation
        predictNextAction: (inferredState) => {
            // SHADOWHACKER-GOD: Predicts what the user is likely to do next (e.g., click a product, leave, search)
            // Based on inferredState, historical patterns, and real-time trends.
            // Example: if (inferredState.engagement < 0.2 && inferredState.frustration > 0.5) return 'exit-intent-offer';
            // This would trigger an exit-intent popup.
        }
    };

    const uiPersonalizer = {
        adaptUI: (inferredState) => {
            console.log('SHADOWHACKER-GOD: Adapting UI based on inferred state:', inferredState);

            // 1. Dynamic Product Reordering and Highlight
            const sortedProducts = [...products].sort((a, b) => {
                const interestA = inferredState.interest[a.id] || 0;
                const interestB = inferredState.interest[b.id] || 0;
                return interestB - interestA; // Sort by highest interest first
            });
            displayProducts(sortedProducts); // Re-render products in new order

            productsContainer.querySelectorAll('.product-card').forEach(card => {
                const productId = parseInt(card.id.replace('product-card-', ''));
                const productInterest = inferredState.interest[productId] || 0;
                const stockElement = card.querySelector('.stock-status');

                // Apply dynamic glow based on interest
                if (productInterest > 0.6 && stockElement && stockElement.textContent.includes('قطع فقط')) {
                    card.classList.add('glowing-card');
                    stockElement.style.fontWeight = 'bold';
                    stockElement.style.animation = 'pulse 1s infinite alternate';
                } else {
                    card.classList.remove('glowing-card');
                    if (stockElement) {
                        stockElement.style.animation = 'none';
                    }
                }
            });

            // 2. Dynamic Price/Offer Display (Price Sensitivity)
            if (inferredState.priceSensitivity > 0.7 && inferredState.conversionLikelihood < 0.5) {
                // If sensitive to price AND hesitant to convert, subtly highlight discounts.
                document.querySelectorAll('.product-card .new-price').forEach(priceElem => {
                    priceElem.style.color = '#ff4500'; // Orange-red for urgency/deal
                    priceElem.style.fontSize = '1.3rem';
                });
            } else {
                document.querySelectorAll('.product-card .new-price').forEach(priceElem => {
                    priceElem.style.color = 'var(--new-price-color)'; // Revert to default
                    priceElem.style.fontSize = '';
                });
            }

            // 3. Frustration Handling: Offer support or simplify UI
            if (inferredState.frustration > 0.6) {
                // Example: Show a discreet "Need Help?" floating button or simplify forms
                if (!document.getElementById('helpFloatButton')) {
                    const helpBtn = document.createElement('button');
                    helpBtn.id = 'helpFloatButton';
                    helpBtn.className = 'btn btn-info whatsapp-float'; // Reuse whatsapp-float style for positioning
                    helpBtn.style.left = '120px'; // Offset from whatsapp button
                    helpBtn.innerHTML = '<i class="fas fa-question-circle"></i>';
                    helpBtn.onclick = () => alert('كيف يمكننا مساعدتك؟'); // Simple alert, could be chat
                    document.body.appendChild(helpBtn);
                    setTimeout(() => helpBtn.remove(), 15000); // Remove after a while
                }
            } else if (document.getElementById('helpFloatButton')) {
                document.getElementById('helpFloatButton').remove();
            }

            // 4. Conversion Likelihood based nudges
            if (inferredState.conversionLikelihood > 0.8 && inferredState.engagement > 0.7) {
                // High likelihood, high engagement: show "Limited Time Offer" banner
                if (!document.getElementById('conversionBanner')) {
                    const banner = document.createElement('div');
                    banner.id = 'conversionBanner';
                    banner.className = 'alert alert-warning text-center fixed-bottom m-0 py-2';
                    banner.innerHTML = '✨ **عرض لفترة محدودة!** أتمم طلبك الآن قبل انتهاء صلاحية الخصم. ✨';
                    document.body.appendChild(banner);
                    setTimeout(() => banner.remove(), 10000); // Show for 10s
                }
            } else if (document.getElementById('conversionBanner')) {
                document.getElementById('conversionBanner').remove();
            }

        },

        // 5. Input & Event Listeners for Behavioral Data Collection
        initListeners: () => {
            // Mouse Movement Tracking
            let lastMouseMove = 0;
            document.addEventListener('mousemove', (e) => {
                const now = Date.now();
                if (now - lastMouseMove > 50) { // Sample every 50ms to reduce data
                    userBehavior.mouseMovements.push({ x: e.clientX, y: e.clientY, timestamp: now, elementId: e.target.id || e.target.className });
                    if (userBehavior.mouseMovements.length > 1000) userBehavior.mouseMovements.shift(); // Keep buffer small
                    lastMouseMove = now;
                }
            });

            // Click Tracking
            document.addEventListener('click', (e) => {
                userBehavior.clicks.push({ x: e.clientX, y: e.clientY, timestamp: Date.now(), elementId: e.target.id || e.target.className, targetTag: e.target.tagName });
                uiPersonalizer.adaptUI(userIntentModel.inferState(userBehavior)); // Adapt UI immediately on click
            });

            // Scroll Depth Tracking
            let lastScrollY = 0;
            document.addEventListener('scroll', () => {
                const now = Date.now();
                if (now - lastScrollY > 100) { // Sample every 100ms
                    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                    userBehavior.scrollDepth.push({ timestamp: now, percentage: scrollPercentage, sectionId: uiPersonalizer.getVisibleSection() });
                    if (userBehavior.scrollDepth.length > 200) userBehavior.scrollDepth.shift();
                    lastScrollY = now;
                }
            });

            // Key Press Tracking (for inputs)
            document.addEventListener('keypress', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    userBehavior.keyPresses.push({ timestamp: Date.now(), key: e.key, inputId: e.target.id || e.target.name });
                    if (userBehavior.keyPresses.length > 300) userBehavior.keyPresses.shift();
                }
            });

            // Time Spent on Elements (by hover/visibility)
            const trackTimeOnElements = () => {
                document.querySelectorAll('a, button, .product-card, img').forEach(element => {
                    let hoverStartTime = 0;
                    element.addEventListener('mouseenter', () => {
                        hoverStartTime = Date.now();
                    });
                    element.addEventListener('mouseleave', () => {
                        if (hoverStartTime) {
                            const duration = Date.now() - hoverStartTime;
                            const id = element.id || element.className || element.tagName;
                            userBehavior.timeOnElements[id] = (userBehavior.timeOnElements[id] || 0) + duration;
                            hoverStartTime = 0;
                        }
                    });
                });

                // Track time on product cards more specifically
                productsContainer.querySelectorAll('.product-card').forEach(card => {
                    const productId = parseInt(card.id.replace('product-card-', ''));
                    let intersectionObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Start tracking time when product is visible
                                if (!userBehavior.productViewTimes[`${productId}_start`]) {
                                    userBehavior.productViewTimes[`${productId}_start`] = Date.now();
                                }
                            } else {
                                // Stop tracking and accumulate time when not visible
                                if (userBehavior.productViewTimes[`${productId}_start`]) {
                                    const duration = Date.now() - userBehavior.productViewTimes[`${productId}_start`];
                                    userBehavior.productViewTimes[productId] = (userBehavior.productViewTimes[productId] || 0) + duration;
                                    delete userBehavior.productViewTimes[`${productId}_start`]; // Reset start time
                                }
                            }
                        });
                    }, { threshold: 0.5 }); // Trigger when 50% of element is visible
                    intersectionObserver.observe(card);
                });
            };
            trackTimeOnElements(); // Initialize once DOM is ready

            // Periodically adapt UI based on cumulative behavior
            setInterval(() => {
                uiPersonalizer.adaptUI(userIntentModel.inferState(userBehavior));
            }, 3000); // Every 3 seconds, re-evaluate and adapt for high responsiveness
        },

        // Helper to get current visible section (simplified heuristic)
        getVisibleSection: () => {
            const sections = document.querySelectorAll('section');
            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    return section.className.split(' ')[0];
                }
            }
            return 'unknown';
        }
    };

    // --- Initialize all core functionalities ---
    initializeDarkMode(); // Set dark mode on load
    uiPersonalizer.initListeners(); // Start tracking user behavior and adapting UI
});