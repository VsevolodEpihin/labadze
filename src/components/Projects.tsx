import React, { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  team?: string;
  description: string;
  role: string;
  duties: string | string[];
  stack?: string;
};

const projects: Project[] = [
  {
    title: "IBS Dunice",
    team:  "Руководитель проекта, Технический лидер, Бизнес-аналитик, Системный аналитик, Дизайнер, 3 frontend-разработчика, 2 backend-разработчика, Тестировщик.",
    role: "Бизнес-аналитик",
    description: " Разработка внутреннего веб-сервиса для работников градостроительного предприятия",
    duties: [
      "Коммуникация со стейкхолдерами, проведение интервью, сбор требований.",
      "Выявление и формализация требований в формате URD с Use case к основным модулям: веб-интерфейсы, выгрузка данных, система ролей, таблица подрядчиков, email-уведомления.",
      "Анализ полноты и ясности требований к реализации системы.",
      "Постановка задач команде разработки на реализацию или доработку программного продукта в Jira.",
      "Моделирование бизнес-процессов в BPMN.",
      "Разработка пользовательских сценариев (User Stories) и критерий приемки (acceptancecriteria).",
      "Проектирование интерфейсов и интерактивных прототипов в Figma и Miro.",
      "Составление документации в Confluence.",
      "Сопровождение команды разработки: уточнение требований, ответы на вопросы, участие в Grooming-сессиях.",
      "Подготовка к демонстрациям продукта бизнесу и участие в этих демонстрациях.",
    ],
    stack:
      "REST API, JSON, PostgreSQL, Java Spring,Figma, Miro, Jira, Confluence, Draw.io, BPMN, UML (Use Case, Sequence Diagram, Activity), SQL",
  },
  {
    title: "Ostap IT — Разработка веб-сайтов",
    team: "2 Fullstack-разработчика, 1 тестировщик, 1 дизайнер, 1 системный аналитик, Team-Lead",
    role: "Руководитель отдела продаж",
    description: "Разработка и поддержка веб-сайтов для клиентов",
    duties: [
      "Выстраивание стратегии развития продаж и отношений с клиентами.",
      "Контроль выполнения планов и достижения показателей эффективности продаж.",
      "Отчетность перед директором компании.",
      "Найм сотрудников.",
      "Подключение, настройка и ведение CRM-системы (AMO).",
      "Планирование мотивации сотрудников.",
      "Мозговые штурмы.",
      "Внедрение скриптов продаж.",
    ],
  },
  {
    title: "Билайн",
    role: "Менеджер по продажам b2b",
    description: "Телефония, интернет для бизнеса, DLP защита от утечки данных, cloud-решения",
    duties: [
      "Выстраивание стратегии развития продаж и отношений с клиентами.",
      "Выполнения планов и достижения показателей эффективности продаж.",
      "Общение с первыми лицами компаний.",
      "Очные встречи/ зумы.",
      "Составление КП.",
      "Успешное закрытие сделок.",
    ],
  },
];

const renderListOrText = (data: string | string[]) => {
  if (Array.isArray(data)) {
    return (
      <ul style={{ margin: "8px 0 8px 18px", padding: 0 }}>
        {data.map((item, idx) => (
          <li className="item-project" key={idx} style={{ marginBottom: 4 }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <span>{data}</span>;
};

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-animate${visible ? " visible" : ""}`}
    >
      <h2>Опыт работы</h2>
      <div className="projects">
        {projects.map((p, i) => (
          <div className="project-card-container">
            <div
            className="project-card-outer"
            key={i}
            style={{ transitionDelay: visible ? `${0.2 + i * 0.15}s` : "0s" }}
            >
              <h3>{p.title}</h3>
              <p>
                {renderListOrText(p.description)}
              </p>
              <p>
                <strong>Роль:</strong> {renderListOrText(p.role)}
              </p>
              <p>
                <strong>Обязанности:</strong> {renderListOrText(p.duties)}
              </p>
              {
                p.stack && (
                  <p>
                    <strong>Стек:</strong> {p.stack}
                  </p>
                )
              }
              {
                p.team && (
                  <p>
                    <strong>Команда:</strong> {p.team}
                  </p>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;