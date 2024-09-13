import styles from "./Menu.module.css";

const Menu = () => {
  const menuSections = [
    {
      title: "Entradas",
      items: [
        { name: "Ensalada Rusa", price: 1700 },
        { name: "Matambre casero", price: 4700 },
        { name: "Empanada", price: 1600 },
        { name: "Lengua a la vinagreta", price: 4900 },
        { name: "Berenjenas en Escabeche", price: 2800 },
      ],
    },
    {
      title: "Platos Principales",
      items: [
        { name: "Pollo con papas", price: 8500 },
        { name: "Lasagna de jamon y queso", price: 8700 },
        { name: "Guiso de lentejas", price: 8000 },
        { name: "Choripán", price: 2500 },
        { name: "Bife de chorizo", price: 9500 },
        { name: "Milanesa napolitana", price: 18800 },
        { name: "Milanesa", price: 12600 },
        { name: "Filete de merluza con pure", price: 8000 },
      ],
    },
    {
      title: "Pastas",
      items: [
        { name: "Tallarines", price: 6300 },
        { name: "Ñoquis", price: 6100 },
        { name: "Ravioles", price: 7700 },
        { name: "Sorrentinos", price: 7700 },
      ],
    },
    {
      title: "Salsas",
      items: [
        { name: "Bolegnesa", price: 2800 },
        { name: "Pesto", price: 2800 },
        { name: "Estofado", price: 2800 },
        { name: "Crema", price: 900 },
        { name: "Roquefort", price: 2800 },
        { name: "Verdeo", price: 2800 },
      ],
    },
    {
      title: "Guarniciones",
      items: [
        { name: "Papas fritas", price: 3300 },
        { name: "Papas fritas Provenzal", price: 3700 },
        { name: "Pure de papas", price: 3100 },
        { name: "Pure de calabaza", price: 3100 },
        { name: "Ensalada mixta", price: 3300 },
        { name: "Ensalada completa", price: 3900 },
      ],
    },
    {
      title: "Bebidas",
      items: [
        { name: "Cerveza Artesanal", price: 4000 },
        { name: "Vino Tinto", price: 7700 },
        { name: "Fernet con Coca-cola", price: 4500 },
        { name: "Gancia con Sprite", price: 4000 },
        { name: "Gin tonik", price: 5000 },
        { name: "Gaseosa grande", price: 3200 },
        { name: "Gaseosa chica", price: 1400 },
        { name: "Agua mineral", price: 2000 },
      ],
    },
    {
      title: "Postres",
      items: [
        { name: "Ensalada de frutas", price: 3400 },
        { name: "Flan casero", price: 1400 },
        { name: "Brownie", price: 2700 },
        { name: "Frutillas", price: 4000 },
      ],
    },
  ];

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.menuTitle}>Menú del Restaurante</h1>
      {menuSections.map((section, index) => (
        <div key={index} className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <ul className={styles.menuItems}>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.menuItem}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Menu;
