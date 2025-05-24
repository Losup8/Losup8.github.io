document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    const nav = document.getElementById("nav");
    const backToTop = document.getElementById("backToTop");
    const loadingBar = document.getElementById("loadingBar");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // Hamburger menu toggle
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });


        const encodedFooter = "JmNvcHk7IDIwMjUgLSAyMDQwIEZ1cnBsZXguIFZzZWNobm5hIHByw6F2YSB2eWhyYWR6ZW5hLg==";
        const footerElement = document.getElementById("footer-encoded");
        if (footerElement) {
          footerElement.innerHTML = atob(encodedFooter);
        }

    // Scroll události
    window.addEventListener("scroll", function () {
        // Navigace - přidání stínu
        if (window.scrollY > 50) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }

        // Zpět nahoru tlačítko
        if (window.scrollY > 300) {
            backToTop.classList.add("active");
        } else {
            backToTop.classList.remove("active");
        }

        // Aktualizace loading baru
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        loadingBar.style.width = scrollPercent + "%";

        // Spuštění animací na scroll
        animateOnScroll();
    });

    // Spustit animace i při načtení stránky
    window.addEventListener("load", animateOnScroll);

    // Funkce pro animace sekcí
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            ".section-title, .about-card, .service-card, .portfolio-item, .contact-info, .contact-form"
        );

        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                el.classList.add("animate");
            }
        });
    }

    // Portfolio filtrování
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            portfolioItems.forEach((item) => {
                const category = item.getAttribute("data-category");
                if (filter === "all" || filter === category) {
                    item.style.display = "block";
                    item.classList.add("animate");
                } else {
                    item.style.display = "none";
                    item.classList.remove("animate");
                }
            });
        });
    });

    // Discord Webhook odeslání formuláře
    const encodedWebhook = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM0OTM4MzgyNzc1NTExMDQwMC80WldWTmZtdURmX0tmNG5WTkUwcUJ4UXZSb01aS0FhZm9kZ292OV9EeUYxTEg5UVJVZGpBckNGcDdKUTZaNlk5VlNKTw=="; // Vyměň za vlastní
    function getWebhookUrl() {
        return atob(encodedWebhook);
    }

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            const content = `📩 **Nový kontakt z webu:**\\n\\n👤 Jméno: \\\`${name}\\\`\\n📧 Email: \\\`${email}\\\`\\n💬 Zpráva:\\n${message}`;

            fetch(getWebhookUrl(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: content })
            })
            .then(res => {
                if (res.ok) {
                    alert("Zpráva odeslána ✅");
                    form.reset();
                } else {
                    alert("Chyba při odeslání ❌");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Nepodařilo se odeslat.");
            });
        });
    }
});