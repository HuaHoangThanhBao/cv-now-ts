import { Common, Education, Publication, WorkExperience } from '../types/Block'
import { v4 as uuidv4 } from 'uuid'

const yearData = {
  month_start: {
    text: '',
    placeHolder: 'mm',
    status: false,
    height: 0
  },
  month_end: {
    text: '',
    placeHolder: 'mm',
    status: false,
    height: 0
  },
  year_start: {
    text: '',
    placeHolder: 'yyyy',
    status: false,
    height: 0
  },
  year_end: {
    text: '',
    placeHolder: 'yyyy',
    status: false,
    height: 0
  }
}

const contactData = {
  contact: {
    text: '',
    placeHolder: 'Contact:',
    status: false,
    height: 0
  },
  contact_person: {
    text: '',
    placeHolder: 'Contact Person',
    status: false,
    height: 0
  },
  contact_info: {
    text: '',
    placeHolder: 'Contact Info',
    status: false,
    height: 0
  }
}

export const educationMetaData: Education = {
  id: '1',
  uid: uuidv4(),
  header: {
    text: 'EDUCATION',
    placeHolder: 'EDUCATION'
  },
  title: {
    text: 'Study Program',
    placeHolder: 'Study Program',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Institution/ Place of education',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'City, Country or GPA (optional)',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '1',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Course/Thesis/Project',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData
}

export const workExperienceMetaData: WorkExperience = {
  id: '2',
  uid: uuidv4(),
  header: {
    text: 'WORK EXPERIENCE',
    placeHolder: 'WORK EXPERIENCE'
  },
  title: {
    text: 'Title/Position',
    placeHolder: 'Title/Position',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Workplace/Company',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'City, Country (optional)',
    status: false,
    height: 0
  },
  optional_dashed2: {
    text: '',
    placeHolder: 'Company Description (optional, fill when the company is not well known)',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '2',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Accomplishment/Responsibility/Task',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData,
  ...contactData
}

export const organizationMetaData: Common = {
  id: '3',
  uid: uuidv4(),
  header: {
    text: 'ORGANIZATIONS',
    placeHolder: 'ORGANIZATIONS'
  },
  title: {
    text: 'Organization Name',
    placeHolder: 'Organization Name',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Role (optional)',
    status: false,
    height: 0
  },
  ...yearData
}

export const certificateMetaData: Common = {
  id: '4',
  uid: uuidv4(),
  header: {
    text: 'CERTIFICATES',
    placeHolder: 'CERTIFICATES'
  },
  title: {
    text: 'Certificate Name',
    placeHolder: 'Certificate Name',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Description (optional)',
    status: false,
    height: 0
  },
  ...yearData
}

export const personalProjectMetaData: Common = {
  id: '5',
  uid: uuidv4(),
  header: {
    text: 'PERSONAL PROJECTS',
    placeHolder: 'PERSONAL PROJECTS'
  },
  title: {
    text: 'Project Name',
    placeHolder: 'Project Name',
    status: true,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '5',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Description of Achievements',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData
}

export const achievementMetaData: Common = {
  id: '6',
  uid: uuidv4(),
  header: {
    text: 'ACHIEVEMENTS',
    placeHolder: 'ACHIEVEMENTS'
  },
  title: {
    text: 'Achievement Name',
    placeHolder: 'Achievement Name',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Description (optional)',
    status: false,
    height: 0
  },
  ...yearData
}

export const conferenceMetaData: Education = {
  id: '7',
  uid: uuidv4(),
  header: {
    text: 'CONFERENCES & COURSES',
    placeHolder: 'CONFERENCES & COURSES'
  },
  title: {
    text: 'Conference/Course Name',
    placeHolder: 'Conference/Course Name',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Conference/Issuer of the certificate',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '7',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Description (optional)',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData
}

export const awardMetaData: Education = {
  id: '8',
  uid: uuidv4(),
  header: {
    text: 'HONOR AWARDS',
    placeHolder: 'HONOR AWARDS'
  },
  title: {
    text: 'Title/Award Name',
    placeHolder: 'Title/Award Name',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Name of the institution that issued/awarded it',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '8',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Description (optional)',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData
}

export const teachingExperienceMetaData: Education = {
  id: '9',
  uid: uuidv4(),
  header: {
    text: 'TEACHING EXPERIENCE',
    placeHolder: 'TEACHING EXPERIENCE'
  },
  title: {
    text: 'Name of the class',
    placeHolder: 'Name of the class',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Institution/Place of Education',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'City, Country',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '9',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Task/Responsibility/Accomplishment',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData
}

export const volunteerMetaData: WorkExperience = {
  id: '10',
  uid: uuidv4(),
  header: {
    text: 'VOLUNTEER EXPERIENCE',
    placeHolder: 'VOLUNTEER EXPERIENCE'
  },
  title: {
    text: 'Title/Position',
    placeHolder: 'Title/Position',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Organization',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'City, Country',
    status: false,
    height: 0
  },
  optional_dashed2: {
    text: '',
    placeHolder: 'Organization Description (optional)',
    status: false,
    height: 0
  },
  optional_dashed3: {
    text: '',
    placeHolder: 'Task/Responsibility/Accomplishment',
    status: false,
    height: 0
  },
  content_bullet: {
    child: [
      {
        id: '10',
        uid: uuidv4(),
        text: '',
        placeHolder: 'Tasks/Achievements',
        status: false,
        height: 0
      }
    ],
    status: false,
    height: 0,
    placeHolder: ''
  },
  ...yearData,
  ...contactData
}

export const supportMetaData: Common = {
  id: '11',
  uid: uuidv4(),
  header: {
    text: 'SUPPORTED CAUSE',
    placeHolder: 'SUPPORTED CAUSE'
  },
  title: {
    text: 'Cause',
    placeHolder: 'Cause',
    status: true,
    height: 0
  }
}

export const languageMetaData: Common = {
  id: '12',
  uid: uuidv4(),
  header: {
    text: 'LANGUAGES',
    placeHolder: 'LANGUAGES'
  },
  title: {
    text: 'Language Name',
    placeHolder: 'Language Name',
    status: true,
    height: 0
  },
  desc: {
    text: 'Description',
    placeHolder: 'Description',
    status: true,
    height: 0
  }
}

export const publicationMetaData: Publication = {
  id: '13',
  uid: uuidv4(),
  header: {
    text: 'PUBLICATIONS',
    placeHolder: 'PUBLICATIONS'
  },
  title: {
    text: 'Publication Title',
    placeHolder: 'Publication Title',
    status: true,
    height: 0
  },
  desc: {
    text: '',
    placeHolder: 'Publication Type',
    status: false,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: 'Author(s)',
    status: false,
    height: 0
  },
  optional_dashed2: {
    text: '',
    placeHolder: 'List of Authors',
    status: false,
    height: 0
  },
  optional_dashed3: {
    text: '',
    placeHolder: 'Date of Publication',
    status: false,
    height: 0
  },
  optional_dashed4: {
    text: '',
    placeHolder: 'Publisher/Issue/Pages, etc.',
    status: false,
    height: 0
  },
  optional_dashed5: {
    text: '',
    placeHolder: 'Description',
    status: false,
    height: 0
  },
  ...yearData
}

export const skillMetaData: Common = {
  id: '14',
  uid: uuidv4(),
  header: {
    text: 'SKILLS',
    placeHolder: 'SKILLS'
  },
  title: {
    text: 'Skill name',
    placeHolder: 'Skill name',
    status: true,
    height: 0
  }
}

export const interestMetaData: Common = {
  id: '15',
  uid: uuidv4(),
  header: {
    text: 'INTERESTS',
    placeHolder: 'INTERESTS'
  },
  title: {
    text: 'Interest',
    placeHolder: 'Interest',
    status: true,
    height: 0
  }
}

export const softSkillMetaData: Common = {
  id: '16',
  uid: uuidv4(),
  header: {
    text: 'SOFT SKILLS',
    placeHolder: 'SOFT SKILLS'
  },
  title: {
    text: 'Soft skill',
    placeHolder: 'Soft skill',
    status: true,
    height: 0
  }
}

export const referenceMetaData: Common = {
  id: '17',
  uid: uuidv4(),
  header: {
    text: 'REFERENCES',
    placeHolder: 'REFERENCES'
  },
  title: {
    text: 'Name and Position',
    placeHolder: 'Name and Position',
    status: true,
    height: 0
  },
  optional_dashed: {
    text: '',
    placeHolder: '“Reference”',
    status: true,
    height: 0
  },
  ...contactData
}
