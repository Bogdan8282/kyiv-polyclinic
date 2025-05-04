import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="wrapper">
      <div className="intro flex gap-6 mb-20">
        <div className="flex flex-col gap-2 w-1/2 justify-center">
          <h4>
            Ласкаво просимо на офіційний веб-сайт Київської міської поліклініки!
          </h4>
          <p>
            Ми піклуємося про ваше здоров’я і прагнемо забезпечити якісне,
            доступне та зручне медичне обслуговування для кожного пацієнта. Тут
            ви знайдете всю необхідну інформацію про наші послуги, лікарів,
            графік роботи, а також зможете записатися на прийом онлайн.
          </p>
          <Link className="btn-link" to="/appointments">
            Записатись
          </Link>
        </div>
        <div className="flex w-1/2 h-[500px] justify-center">
          <img
            className="rounded-md object-cover h-full w-full"
            src="/registry.jpg"
            alt="registry"
          />
        </div>
      </div>

      <div className="about flex gap-6 mb-20">
        <div className="flex w-1/2 h-[500px] justify-center">
          <img
            className="rounded-md object-cover h-full w-full"
            src="/bear-plushy.jpg"
            alt="registry"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 justify-center">
          <h4>Трохи про нас:</h4>
          <p>
            Наша поліклініка — це сучасний медичний заклад, що надає широкий
            спектр амбулаторно-поліклінічних послуг для дорослих. Ми працюємо
            відповідно до європейських стандартів якості, використовуємо сучасне
            обладнання та індивідуальний підхід до кожного пацієнта. У нашому
            штаті — кваліфіковані лікарі з багаторічним досвідом, які постійно
            підвищують свою кваліфікацію.
          </p>
        </div>
      </div>

      <div className="services flex gap-6 mb-20">
        <div className="flex flex-col gap-4 w-1/2 justify-center">
          <p>
            Ми надаємо широкий спект послуг. Ви можете записатися на прийом до
            лікаря в зручний для вас час через форму онлайн-запису або за
            телефоном реєстратури. Онлайн-запис дозволяє обрати лікаря, дату та
            час прийому за кілька кліків, не виходячи з дому.
          </p>
          <Link className="btn-link" to="/appointments">
            Записатись
          </Link>
        </div>
        <div className="w-px bg-gray-300" />
        <div className="flex flex-col gap-4 w-1/2 justify-center">
          <ul className="flex flex-col gap-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>
                Консультації терапевта, сімейного лікаря та профільних
                спеціалістів
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Лабораторна діагностика (аналізи крові, сечі тощо)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>УЗД, ЕКГ, флюорографія</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Щеплення та профілактичні огляди</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>Видача лікарняних листів, довідок</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✓</span>
              <span>
                Медичні огляди для водіїв, студентів, працевлаштування
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="services flex gap-6 mb-20">
        <div className="flex flex-col w-1/2 justify-center gap-4">
          <h4>Контактна інформація</h4>
          <p>
            Якщо у вас виникли питання, зв'яжіться з нами за вказаними нижче
            реквізитами або особисто завітайте до нас!
          </p>
          <p>
            <strong>Адреса:</strong> м. Київ, вул. Героїв, буд. 42
          </p>
          <p>
            <strong>Телефон:</strong> +38 (044) 231-56-65
          </p>
          <p>
            <strong>E-mail:</strong> kyiv-polyclinic@gmail.com
          </p>
          <div className="flex flex-col gap-2">
            <strong>Графік роботи:</strong>
            <p>Пн-Пт: 8:00 – 19:00</p>
            <p>Сб: 8:00 – 19:00</p>
            <p>Нд: вихідний</p>
          </div>
        </div>
        <div className="flex w-1/2 h-[500px] justify-center">
          <img
            className="rounded-md object-cover h-full w-full"
            src="/inspection.jpg"
            alt="registry"
          />
        </div>
      </div>
    </main>
  );
}
