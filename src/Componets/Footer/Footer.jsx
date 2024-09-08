const Footer = () => {
  return (
    <footer className="text-white">
      <div className="footer gap-0">
        <nav className="bg-[#1F2937] flex items-center flex-col w-full p-10">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav className="bg-[#111827] flex items-center flex-col w-full p-10">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
      </div>
      <p className="text-center bg-[#151515] p-4">
        Copyright © {new Date().getFullYear()} - CulinaryCloud. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;