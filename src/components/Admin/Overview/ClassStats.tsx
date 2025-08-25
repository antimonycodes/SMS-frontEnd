const ClassStats = () => {
  const classStructure = [
    {
      level: "JSS 1",
      sections: ["JSS 1A", "JSS 1B", "JSS 1C"],
      students: 195,
      teachers: 12,
    },
    {
      level: "JSS 2",
      sections: ["JSS 2A", "JSS 2B", "JSS 2C"],
      students: 189,
      teachers: 11,
    },
    {
      level: "JSS 3",
      sections: ["JSS 3A", "JSS 3B", "JSS 3C"],
      students: 203,
      teachers: 13,
    },
    {
      level: "SSS 1",
      sections: ["SSS 1A", "SSS 1B", "SSS 1C"],
      students: 178,
      teachers: 14,
    },
    {
      level: "SSS 2",
      sections: ["SSS 2A", "SSS 2B", "SSS 2C"],
      students: 192,
      teachers: 15,
    },
    {
      level: "SSS 3",
      sections: ["SSS 3A", "SSS 3B", "SSS 3C"],
      students: 190,
      teachers: 16,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Class Structure Overview</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classStructure.map((classLevel, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {classLevel.level}
              </h4>
              <p className="text-sm text-gray-600">
                Sections: {classLevel.sections.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                Students: {classLevel.students} | Teachers:{" "}
                {classLevel.teachers}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassStats;
