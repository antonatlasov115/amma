import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Художественные фильмы",
      description: "Создание полнометражных и короткометражных художественных фильмов различных жанров и направлений. Мы осуществляем полный цикл производства: от разработки идеи и сценария до постпродакшна и продвижения готового фильма.",
      features: [
        "Разработка концепции и сценария",
        "Подбор актеров и локаций",
        "Съемочный процесс с использованием профессионального оборудования",
        "Монтаж, цветокоррекция, звуковое оформление",
        "Продвижение готового фильма"
      ],
      image: "/images/service-1.jpg"
    },
    {
      id: 2,
      title: "Документальное кино",
      description: "Создание документальных фильмов на социальные, исторические, научные и другие темы. Мы специализируемся на глубоком и всестороннем раскрытии выбранной темы, делая акцент на достоверности и эмоциональном воздействии.",
      features: [
        "Исследование темы и сбор материалов",
        "Интервью с экспертами и участниками событий",
        "Съемки в реальных локациях",
        "Работа с архивными материалами",
        "Профессиональный монтаж и звуковое оформление"
      ],
      image: "/images/service-2.jpg"
    },
    {
      id: 3,
      title: "Рекламные ролики",
      description: "Создание эффективных рекламных роликов, которые не только информируют о продукте или услуге, но и вызывают эмоциональный отклик у целевой аудитории. Мы разрабатываем концепции, которые выделяют ваш бренд на фоне конкурентов.",
      features: [
        "Разработка креативной концепции",
        "Создание сценария с учетом маркетинговых целей",
        "Профессиональная съемка с использованием современного оборудования",
        "Кастинг актеров и подбор локаций",
        "Монтаж, спецэффекты, анимация"
      ],
      image: "/images/service-3.jpg"
    },
    {
      id: 4,
      title: "Музыкальные клипы",
      description: "Создание ярких и запоминающихся музыкальных клипов, которые подчеркивают индивидуальность исполнителя и усиливают эмоциональное воздействие музыкального произведения на аудиторию.",
      features: [
        "Разработка концепции, соответствующей стилю и имиджу исполнителя",
        "Подбор локаций и декораций",
        "Хореография и постановка сцен",
        "Работа с профессиональными танцорами и актерами",
        "Спецэффекты и компьютерная графика"
      ],
      image: "/images/service-4.jpg"
    },
    {
      id: 5,
      title: "Корпоративное видео",
      description: "Создание видеоконтента для внутренних и внешних корпоративных нужд: презентационные фильмы, отчетные видео, обучающие материалы, видеоотчеты с мероприятий и т.д.",
      features: [
        "Разработка концепции с учетом корпоративного стиля и целей",
        "Съемка в офисе или на производстве",
        "Интервью с сотрудниками и руководством",
        "Инфографика и анимация для наглядной подачи информации",
        "Профессиональное озвучивание"
      ],
      image: "/images/service-5.jpg"
    },
    {
      id: 6,
      title: "Аренда оборудования и студии",
      description: "Предоставление в аренду профессионального съемочного оборудования и студийных помещений для реализации ваших проектов. Возможность аренды как отдельных единиц оборудования, так и комплексных решений.",
      features: [
        "Профессиональные камеры, оптика, световое оборудование",
        "Звукозаписывающее оборудование",
        "Студийные помещения различной площади",
        "Помощь технических специалистов",
        "Гибкие условия аренды"
      ],
      image: "/images/service-6.jpg"
    }
  ];

  return (
    <main className="pt-20">
      <section className="w-full py-28 bg-black">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light tracking-widest text-center mb-8">НАШИ УСЛУГИ</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-sm opacity-60 leading-relaxed text-center">
              Полный спектр услуг в сфере кино- и видеопроизводства с фокусом на высокое качество и профессионализм
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-28 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="mb-32 last:mb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h2 className="text-xl font-light tracking-widest mb-12">{service.title}</h2>
                  <p className="text-sm opacity-60 leading-relaxed mb-12">{service.description}</p>
                  <ul className="space-y-4 mb-12">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="opacity-40 mr-3 text-xs">—</span>
                        <span className="text-xs opacity-60 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 border border-zinc-800 px-6 py-3 transition-opacity">
                    Подробнее
                  </button>
                </div>
                <div className={`h-[70vh] border border-zinc-900 opacity-80 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
              {index < services.length - 1 && (
                <div className="w-full h-px bg-zinc-900 my-32"></div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className="py-28 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-light tracking-widest mb-20">НАШИ ПРЕИМУЩЕСТВА</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-zinc-900 p-8 min-h-[200px]">
              <h3 className="text-sm uppercase tracking-widest mb-8">Опыт</h3>
              <p className="text-xs opacity-60 leading-relaxed">Наша команда состоит из профессионалов с многолетним опытом работы в киноиндустрии</p>
            </div>
            <div className="border border-zinc-900 p-8 min-h-[200px]">
              <h3 className="text-sm uppercase tracking-widest mb-8">Индивидуальность</h3>
              <p className="text-xs opacity-60 leading-relaxed">Мы разрабатываем уникальные концепции под каждый проект и клиента</p>
            </div>
            <div className="border border-zinc-900 p-8 min-h-[200px]">
              <h3 className="text-sm uppercase tracking-widest mb-8">Оборудование</h3>
              <p className="text-xs opacity-60 leading-relaxed">Используем только профессиональное оборудование последнего поколения</p>
            </div>
            <div className="border border-zinc-900 p-8 min-h-[200px]">
              <h3 className="text-sm uppercase tracking-widest mb-8">Прозрачность</h3>
              <p className="text-xs opacity-60 leading-relaxed">Держим клиента в курсе всех этапов работы над проектом</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-28 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-xl font-light tracking-widest mb-8">ОСТАЛИСЬ ВОПРОСЫ?</h2>
          <p className="text-sm opacity-60 leading-relaxed mb-12">Свяжитесь с нами, и мы с радостью расскажем подробнее о наших услугах и ответим на все ваши вопросы.</p>
          <Link 
            href="/contact" 
            className="inline-block text-xs uppercase tracking-widest opacity-60 hover:opacity-100 border border-zinc-800 px-6 py-3 transition-opacity"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </main>
  );
} 