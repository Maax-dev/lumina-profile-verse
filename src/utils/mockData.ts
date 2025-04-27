
// Mock data for when the backend is unavailable

export const generateMockPeople = (count: number = 10) => {
  const locations = ["Los Angeles", "San Francisco", "New York", "Chicago", "Seattle", "Austin"];
  const companies = ["UCLA", "Google", "Microsoft", "Apple", "Amazon", "Meta"];
  const jobTitles = ["Software Engineer", "Product Manager", "Data Scientist", "UI/UX Designer", "Marketing Manager"];
  const universities = ["UCLA", "Stanford", "Berkeley", "MIT", "Harvard", "Caltech"];
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const names = ["Alex Johnson", "Sam Smith", "Jordan Lee", "Taylor Wong", "Casey Brown", "Morgan Chen", 
                "Riley Kim", "Jamie Garcia", "Drew Patel", "Quinn Martinez"];

  return Array.from({ length: count }, (_, i) => {
    const id = `mock-${i}-${Date.now()}`;
    const name = names[i % names.length];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const university = universities[Math.floor(Math.random() * universities.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    
    return {
      profile: {
        id,
        name,
        location,
        headline: `${jobTitle} at ${company}`,
        description: `Alumni with experience in ${jobTitle.toLowerCase()} roles.`,
        title: jobTitle,
        profile_picture_url: "",
        linkedin_url: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '-')}`
      },
      experience: [
        {
          company_name: company,
          title: jobTitle,
          start_date: `${year-2}-01`,
          end_date: null,
          description: `Working as a ${jobTitle} at ${company}`
        }
      ],
      education: [
        {
          school_name: university,
          degree: "Bachelor's Degree",
          field_of_study: "Computer Science",
          start_date: `${year-4}-09`,
          end_date: `${year}-06`
        }
      ]
    };
  });
};

export const getMockSearchResults = (query: string) => {
  const mockPeople = generateMockPeople(10);
  return {
    results: mockPeople,
    total: mockPeople.length,
    query: query
  };
};

export const getMockHistory = () => {
  return [
    {
      query: "Software Engineers at Google",
      total: 5,
      source: "/getPeople",
      result: generateMockPeople(5)
    },
    {
      query: "UCLA Data Science graduates",
      total: 3,
      source: "/getPeopleByNLP",
      result: generateMockPeople(3)
    }
  ];
};
