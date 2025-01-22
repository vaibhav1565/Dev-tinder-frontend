const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4 fixed z-[-10] bottom-0">
      <aside className="grid-flow-col items-center">
        <p>Copyleft © {new Date().getFullYear()} - No right reserved</p>
      </aside>
    </footer>
  );
}

export default Footer