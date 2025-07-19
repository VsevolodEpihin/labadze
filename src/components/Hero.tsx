import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    }; 
  }, []);

  const copyToClipboard = async (text: string, contactType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedContact(contactType);
      setTimeout(() => setCopiedContact(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className={`hero-section section-animate${visible ? " visible" : ""}`}
    >
      <div className="hero-info">
        <h1>Лабадзе Георгий</h1>
        <p>
        Бизнес-аналитик, умеющий находить общий язык с бизнесом, командой разработки и конечным пользователем. Сильные коммуникативные навыки позволяют мне задавать правильные вопросы и слышать между строк, выявляя истинные потребности. Мне комфортно работать с неопределённостью — я легко превращаю разрозненные идеи и хаотичные вводные в чёткую структуру и понятные требования. Ориентирован на командный результат: не просто формулирую задачи, а помогаю команде их глубоко понять и реализовать максимально эффективно. Благодаря системному мышлению и вниманию к деталям, я умею выявлять взаимосвязи в процессах и находить точки роста.
        </p>
        <p>
        Навыки командного взаимодействия и умение добиваться общей цели я развивал через спорт, в частности, волейбол — он стал отличной школой доверия, ответственности и слаженной работы в коллективе.
        </p>

        <div className="hero-contacts">
          <div className="contact-item">
            <span className="contact-label">Telegram:</span>
            <a
              className="contact-value"
              href="https://t.me/geolabadze"
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть Telegram"
              style={{ textDecoration: "none" }}
            >
              @geolabadze
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a
              className="contact-value"
              href="mailto:glabadze02@gmail.com"
              title="Написать на почту"
              style={{ textDecoration: "none" }}
            >
              glabadze02@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <span className="contact-label">Phone:</span>
            <span
              className="contact-value"
              onClick={() => copyToClipboard("+7 (993) 087-86-69", "phone")}
              title="Нажмите чтобы скопировать"
            >
              +7 (993) 087-86-69
              {copiedContact === "phone" && (
                <span className="copy-indicator">✓ Скопировано!</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-photo">
        <img src="/visite-site/photo.jpg" alt="Фото" />
      </div>
    </section>
  );
};

export default Hero;