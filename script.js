    // SOFTWARE PRODUCTS DATA CATALOG
        const products = [
            {
                id: 'nidahas-pos-pro',
                name: 'nidahas POS Engine Pro',
                category: 'pos',
                price: 49.00,
                rating: 4.9,
                icon: 'fa-cash-register',
                badge: 'BESTSELLER',
                shortDesc: 'Complete desktop & cloud POS system for retail, dining, and multi-branch inventory tracking.',
                specs: [
                    'Offline First Data Syncing',
                    'Thermal Receipt Printer & Scanner Ready',
                    'Multi-User Access Control',
                    'Export CSV / PDF Sales Reports'
                ]
            },
            {
                id: 'cyberguard-vault',
                name: 'CyberGuard Encryption Vault',
                category: 'security',
                price: 39.00,
                rating: 4.8,
                icon: 'fa-user-shield',
                badge: 'POPULAR',
                shortDesc: 'Military-grade AES-256 local file and key folder encryptor for sensitive developer credentials.',
                specs: [
                    'Zero-Knowledge Local Storage',
                    'Auto Lock on System Idle',
                    'Cross-Platform Windows / Linux',
                    'SHA-512 Hashing Tools'
                ]
            },
            {
                id: 'auto-backup-bot',
                name: 'AutoSync Desktop Utility',
                category: 'utility',
                price: 19.00,
                rating: 4.7,
                icon: 'fa-cloud-arrow-up',
                badge: 'UTILITY',
                shortDesc: 'Automated incremental local and cloud directory backup scheduler with smart log notifications.',
                specs: [
                    'Scheduled Interval Backups',
                    'Compressed Zip Encryption',
                    'Low Memory Footprint (<25MB)',
                    'Discord/Telegram Webhook Alerts'
                ]
            },
            {
                id: 'neural-coder-ai',
                name: 'Neural Assistant Script Studio',
                category: 'ai',
                price: 69.00,
                rating: 5.0,
                icon: 'fa-brain',
                badge: 'NEW AI',
                shortDesc: 'Local LLM wrapper & automated code refactoring assistant for Python and Web projects.',
                specs: [
                    'Local Model Execution Support',
                    'Code Optimization Generator',
                    'API Key Keyring Manager',
                    'Custom System Prompt Presets'
                ]
            },
            {
                id: 'inventory-master-pos',
                name: 'StockPulse Warehouse POS',
                category: 'pos',
                price: 59.00,
                rating: 4.9,
                icon: 'fa-boxes-stacked',
                badge: 'ENTERPRISE',
                shortDesc: 'High-volume barcode warehouse stocking application with instant threshold restock alerts.',
                specs: [
                    'Barcode Generation & Printing',
                    'Supplier Purchase Order System',
                    'Batch & Expiry Date Tracking',
                    'Multi-location Transfer Log'
                ]
            },
            {
                id: 'web-scraper-studio',
                name: 'DataExtractor Pro Script',
                category: 'utility',
                price: 29.00,
                rating: 4.6,
                icon: 'fa-spider',
                badge: 'FAST',
                shortDesc: 'High-speed multi-threaded web content parser and structured JSON data collector.',
                specs: [
                    'Headless Browser Automation',
                    'Proxy Rotation Support',
                    'JSON / SQLite Export Formats',
                    'Anti-Bot Dynamic Bypass Engine'
                ]
            }
        ];

        // GLOBAL CART STATE
        let cart = [];

        // INITIALIZATION ON WINDOW LOAD
        window.onload = function() {
            document.getElementById('current-year').textContent = new Date().getFullYear();
            renderProducts(products);
            initParticleCanvas();
            
            // Live Search Bar Listener
            document.getElementById('nav-search-input').addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                const filtered = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.shortDesc.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );
                renderProducts(filtered);
            });
        };

        // RENDER PRODUCTS TO GRID
        function renderProducts(items) {
            const grid = document.getElementById('software-grid');
            grid.innerHTML = '';

            if (items.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12 text-slate-500 font-mono">
                        <i class="fa-solid fa-magnifying-glass text-3xl mb-3 block"></i>
                        No software products match your search query.
                    </div>
                `;
                return;
            }

            items.forEach(product => {
                const card = document.createElement('div');
                card.className = 'glass-panel rounded-2xl p-6 border-slate-800 hover:border-cyber-accent/40 transition-all duration-300 flex flex-col justify-between group relative';
                
                card.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyber-accent text-2xl group-hover:scale-110 transition-transform">
                                <i class="fa-solid ${product.icon}"></i>
                            </div>
                            <span class="px-2.5 py-1 rounded-full bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 text-[10px] font-mono font-bold">
                                ${product.badge}
                            </span>
                        </div>

                        <div>
                            <div class="flex items-center gap-2 text-xs text-yellow-400 font-mono mb-1">
                                <i class="fa-solid fa-star"></i>
                                <span>${product.rating} / 5.0</span>
                            </div>
                            <h3 class="text-lg font-bold text-white group-hover:text-cyber-accent transition-colors">${product.name}</h3>
                            <p class="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">${product.shortDesc}</p>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <div>
                            <span class="text-[10px] text-slate-500 font-mono block">Lifetime License</span>
                            <span class="text-xl font-bold font-mono text-white">$${product.price.toFixed(2)}</span>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="openProductModal('${product.id}')" class="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-cyber-accent transition-all" title="Preview Details">
                                <i class="fa-solid fa-eye text-xs"></i>
                            </button>
                            <button onclick="addToCart('${product.id}')" class="px-4 py-2.5 rounded-xl bg-cyber-accent text-slate-950 font-bold font-mono text-xs hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                                Buy Now
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // FILTER CATEGORY TABS
        function filterCategory(cat) {
            document.querySelectorAll('#category-tabs .category-btn').forEach(btn => {
                if (btn.dataset.cat === cat) {
                    btn.className = 'category-btn active px-4 py-2 rounded-xl text-xs font-medium font-mono transition-all bg-cyber-accent text-slate-950 font-bold';
                } else {
                    btn.className = 'category-btn px-4 py-2 rounded-xl text-xs font-medium font-mono text-slate-400 hover:text-white glass-panel transition-all';
                }
            });

            if (cat === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === cat);
                renderProducts(filtered);
            }
        }

        // MODAL LOGIC
        function openProductModal(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;

            document.getElementById('modal-icon').innerHTML = `<i class="fa-solid ${product.icon}"></i>`;
            document.getElementById('modal-category').textContent = product.category + ' module';
            document.getElementById('modal-title').textContent = product.name;
            document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('modal-desc').textContent = product.shortDesc;

            const specsList = document.getElementById('modal-specs');
            specsList.innerHTML = product.specs.map(spec => `<li class="flex items-center gap-2"><i class="fa-solid fa-caret-right text-cyber-accent"></i> ${spec}</li>`).join('');

            const addBtn = document.getElementById('modal-add-btn');
            addBtn.onclick = function() {
                addToCart(product.id);
                closeProductModal();
            };

            document.getElementById('product-modal').classList.remove('hidden');
        }

        function closeProductModal() {
            document.getElementById('product-modal').classList.add('hidden');
        }

        // CART DRAWER LOGIC
        function addToCart(productId) {
            const item = products.find(p => p.id === productId);
            if (!item) return;

            const existing = cart.find(c => c.id === productId);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ ...item, qty: 1 });
            }

            updateCartUI();
            showToast(`Added ${item.name} to order.`);
        }

        function quickBuyPlan(planName, price) {
            const planItem = {
                id: planName.toLowerCase().replace(/\s+/g, '-'),
                name: planName,
                price: price,
                qty: 1
            };
            cart.push(planItem);
            updateCartUI();
            toggleCartDrawer();
            showToast(`Selected ${planName}`);
        }

        function updateCartUI() {
            const countEl = document.getElementById('cart-count');
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            countEl.textContent = totalQty;

            const container = document.getElementById('cart-items-container');
            const totalEl = document.getElementById('cart-total-price');

            if (cart.length === 0) {
                container.innerHTML = `<p class="text-slate-500 text-xs font-mono text-center py-12">Your software cart is currently empty.</p>`;
                totalEl.textContent = '$0.00';
                return;
            }

            container.innerHTML = '';
            let grandTotal = 0;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.qty;
                grandTotal += itemTotal;

                const row = document.createElement('div');
                row.className = 'glass-panel p-4 rounded-xl border-slate-800 flex items-center justify-between text-xs font-mono';
                row.innerHTML = `
                    <div>
                        <h4 class="font-bold text-white">${item.name}</h4>
                        <p class="text-slate-400 mt-1">$${item.price.toFixed(2)} x ${item.qty}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-cyber-accent font-bold">$${itemTotal.toFixed(2)}</span>
                        <button onclick="removeFromCart(${index})" class="text-slate-500 hover:text-red-400">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
                container.appendChild(row);
            });

            totalEl.textContent = `$${grandTotal.toFixed(2)}`;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function toggleCartDrawer() {
            const drawer = document.getElementById('cart-drawer');
            drawer.classList.toggle('translate-x-full');
        }

        function checkoutCart() {
            if (cart.length === 0) {
                alert('Your cart is empty. Add software products to checkout.');
                return;
            }
            alert('nidahas Checkout Demo: Simulating encrypted license generation and key delivery...');
            cart = [];
            updateCartUI();
            toggleCartDrawer();
            showToast('Order completed! Check your email for license key.');
        }

        // SANDBOX PREVIEW WIDGET INTERACTION
        let sandboxItems = [];
        function addSandboxItem(name, price) {
            sandboxItems.push({ name, price });
            renderSandbox();
        }

        function renderSandbox() {
            const list = document.getElementById('sandbox-items-list');
            const totalEl = document.getElementById('sandbox-total');
            
            if (sandboxItems.length === 0) {
                list.innerHTML = `<p class="text-slate-500 italic">No items added to mock register.</p>`;
                totalEl.textContent = '$0.00';
                return;
            }

            list.innerHTML = '';
            let sum = 0;
            sandboxItems.forEach(item => {
                sum += item.price;
                const p = document.createElement('div');
                p.className = 'flex justify-between items-center text-slate-300';
                p.innerHTML = `<span>• ${item.name}</span><span class="text-cyber-accent">$${item.price.toFixed(2)}</span>`;
                list.appendChild(p);
            });

            totalEl.textContent = `$${sum.toFixed(2)}`;
        }

        function simulatePOSReceipt() {
            if (sandboxItems.length === 0) {
                showToast('Add items to the sandbox register first!');
                return;
            }
            showToast('Printing sandbox thermal receipt...');
            sandboxItems = [];
            renderSandbox();
        }

        function switchSandboxTab(tab) {
            const posTab = document.getElementById('sandbox-pos');
            const cryptTab = document.getElementById('sandbox-crypt');
            const posBtn = document.getElementById('tab-pos-btn');
            const cryptBtn = document.getElementById('tab-crypt-btn');

            if (tab === 'pos') {
                posTab.classList.remove('hidden');
                cryptTab.classList.add('hidden');
                posBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-mono bg-cyber-accent text-slate-950 font-bold transition-all';
                cryptBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-400 hover:text-white transition-all';
            } else {
                cryptTab.classList.remove('hidden');
                posTab.classList.add('hidden');
                cryptBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-mono bg-cyber-purple text-white font-bold transition-all';
                posBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-400 hover:text-white transition-all';
            }
        }

        function encryptDemoText() {
            const val = document.getElementById('crypto-input').value;
            const output = document.getElementById('crypto-output');
            if (!val) {
                output.textContent = 'Please enter text to encrypt.';
                return;
            }
            // Simple mock hash/encryption transformation visualization
            let hash = 'NIDAHAS_AES256_';
            for (let i = 0; i < val.length; i++) {
                hash += val.charCodeAt(i).toString(16).toUpperCase();
            }
            output.textContent = hash + '_SECURE_KEY_END';
        }

        // TOAST NOTIFICATIONS
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').textContent = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        // MOBILE MENU TOGGLE
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // FORM SUBMIT HANDLER
        function handleFormSubmit(e) {
            e.preventDefault();
            showToast('Inquiry sent successfully! We will contact you back.');
            e.target.reset();
        }

        // BACKGROUND PARTICLE CANVAS ANIMATION
        function initParticleCanvas() {
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            
            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = [];
            const particleCount = 35;

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
                    ctx.fill();
                });

                requestAnimationFrame(animate);
            }
            animate();
        }
    