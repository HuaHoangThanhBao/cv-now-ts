import React from 'react';
import { ReactComponent as EducationIcon } from '../../assets/education.svg';
import { ReactComponent as WorkExperienceIcon } from '../../assets/work-experience.svg';
import { ReactComponent as SoftSkillIcon } from '../../assets/soft-skill.svg';
import { ReactComponent as SupportCauseIcon } from '../../assets/support-cause.svg';
import { ReactComponent as InterestIcon } from '../../assets/interest.svg';
import { ReactComponent as OrganizationIcon } from '../../assets/organization.svg';
import { ReactComponent as CertificateIcon } from '../../assets/certificate.svg';
import { ReactComponent as PersonalProjectIcon } from '../../assets/personal-project.svg';
import { ReactComponent as AchievementIcon } from '../../assets/achievement.svg';
import { ReactComponent as ConferenceIcon } from '../../assets/conference.svg';
import { ReactComponent as HonorAwardIcon } from '../../assets/honor-award.svg';
import { ReactComponent as TeachingExperienceIcon } from '../../assets/teaching-experience.svg';
import { ReactComponent as VolunteerIcon } from '../../assets/volunteer.svg';
import { ReactComponent as LanguageIcon } from '../../assets/language.svg';
import { ReactComponent as PublicationIcon } from '../../assets/publication.svg';
import { ReactComponent as SkillIcon } from '../../assets/skill.svg';
import { ReactComponent as ReferenceIcon } from '../../assets/reference.svg';

import { ReactComponent as MailIconWhite } from '../../assets//mail.svg';
import { ReactComponent as PhoneIconWhite } from '../../assets//phone.svg';
import { ReactComponent as LocationIconWhite } from '../../assets//location.svg';
import { ReactComponent as WebsiteIconWhite } from '../../assets//website.svg';
import { ReactComponent as LinkedinIconWhite } from '../../assets//linkedin.svg';
import { ReactComponent as TwitterIconWhite } from '../../assets//twitter.svg';
import { ReactComponent as SkypeIconWhite } from '../../assets//skype.svg';
import { ReactComponent as FacebookIconWhite } from '../../assets//facebook.svg';
import { ReactComponent as GithubIconWhite } from '../../assets//github.svg';
import { ReactComponent as StackOverFlowIconWhite } from '../../assets//stackoverflow.svg';
import { ReactComponent as MediumIconWhite } from '../../assets//medium.svg';
import { ReactComponent as InstagramIconWhite } from '../../assets//instagram.svg';
import './icon.scss';

interface IconProps {
  iconType: number | string;
  iconColorHex: string;
}

export const Icon = (props: IconProps) => {
  const { iconType, iconColorHex } = props;

  const renderIcon = (type: number | string) => {
    if (typeof type === 'number') {
      switch (type) {
        case 1:
          return <EducationIcon />;
        case 2:
          return <WorkExperienceIcon />;
        case 3:
          return <OrganizationIcon />;
        case 4:
          return <CertificateIcon />;
        case 5:
          return <PersonalProjectIcon />;
        case 6:
          return <AchievementIcon />;
        case 7:
          return <ConferenceIcon />;
        case 8:
          return <HonorAwardIcon />;
        case 9:
          return <TeachingExperienceIcon />;
        case 10:
          return <VolunteerIcon />;
        case 11:
          return <SupportCauseIcon />;
        case 12:
          return <LanguageIcon />;
        case 13:
          return <PublicationIcon />;
        case 14:
          return <SkillIcon />;
        case 15:
          return <InterestIcon />;
        case 16:
          return <SoftSkillIcon />;
        case 17:
          return <ReferenceIcon />;
        default:
          return <EducationIcon />;
      }
    } else {
      switch (type) {
        case 'email':
          return <MailIconWhite />;
        case 'address':
          return <LocationIconWhite />;
        case 'phoneNumber':
          return <PhoneIconWhite />;
        case 'website':
          return <WebsiteIconWhite />;
        case 'linkedIn':
          return <LinkedinIconWhite />;
        case 'twitter':
          return <TwitterIconWhite />;
        case 'skype':
          return <SkypeIconWhite />;
        case 'facebook':
          return <FacebookIconWhite />;
        case 'github':
          return <GithubIconWhite />;
        case 'stackOverflow':
          return <StackOverFlowIconWhite />;
        case 'medium':
          return <MediumIconWhite />;
        case 'instagram':
          return <InstagramIconWhite />;
        default:
          return null;
      }
    }
  };

  return (
    <div
      className={`icon ${typeof iconType === 'string' ? 'social' : ''}`}
      style={{ backgroundColor: `${iconColorHex}` }}
    >
      {renderIcon(iconType)}
    </div>
  );
};
