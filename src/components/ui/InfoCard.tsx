const InfoCard = ({ label, data }: any) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{data}</span>
    </div>
  );
};

export default InfoCard;
