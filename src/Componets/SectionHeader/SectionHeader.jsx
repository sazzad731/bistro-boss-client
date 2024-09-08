
const SectionHeader = ({heading, subHeading, className}) => {
  return (
    <div className="sm:w-96 mx-auto text-center mb-12">
      <p className="text-[#D99904] text-xl italic mb-4">---{subHeading}---</p>
      <h2 className={`uppercase text-4xl border-y-4 py-4 ${className}`}>{heading}</h2>
    </div>
  );
};

export default SectionHeader;