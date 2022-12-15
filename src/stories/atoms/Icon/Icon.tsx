import { ReactComponent as EducationIcon } from '../../assets/education.svg'
import { ReactComponent as WorkExperienceIcon } from '../../assets/work-experience.svg'
import { ReactComponent as SoftSkillIcon } from '../../assets/soft-skill.svg'
import { ReactComponent as SupportCauseIcon } from '../../assets/support-cause.svg'
import { ReactComponent as InterestIcon } from '../../assets/interest.svg'
import { ReactComponent as OrganizationIcon } from '../../assets/organization.svg'
import { ReactComponent as CertificateIcon } from '../../assets/certificate.svg'
import { ReactComponent as PersonalProjectIcon } from '../../assets/personal-project.svg'
import { ReactComponent as AchievementIcon } from '../../assets/achievement.svg'
import { ReactComponent as ConferenceIcon } from '../../assets/conference.svg'
import { ReactComponent as HonorAwardIcon } from '../../assets/honor-award.svg'
import { ReactComponent as TeachingExperienceIcon } from '../../assets/teaching-experience.svg'
import { ReactComponent as VolunteerIcon } from '../../assets/volunteer.svg'
import { ReactComponent as LanguageIcon } from '../../assets/language.svg'
import { ReactComponent as PublicationIcon } from '../../assets/publication.svg'
import { ReactComponent as SkillIcon } from '../../assets/skill.svg'
import { ReactComponent as ReferenceIcon } from '../../assets/reference.svg'

import { ReactComponent as AddIcon } from '../../assets/add.svg'
import { ReactComponent as FontIcon } from '../../assets/font.svg'
import { ReactComponent as BoldIcon } from '../../assets/text-bold.svg'
import { ReactComponent as ItalicIcon } from '../../assets/text-italic.svg'
import { ReactComponent as UnderlineIcon } from '../../assets/text-underline.svg'
import { ReactComponent as MoveUpIcon } from '../../assets/move-up.svg'
import { ReactComponent as MoveDownIcon } from '../../assets/move-down.svg'
import { ReactComponent as TrashIcon } from '../../assets/trash.svg'
import { ReactComponent as ThemeIcon } from '../../assets/theme.svg'
import { ReactComponent as TemplateIcon } from '../../assets/template-switch.svg'
import { ReactComponent as LayoutIcon } from '../../assets/layout.svg'
import { ReactComponent as SettingIcon } from '../../assets/settings.svg'
import { ReactComponent as DownloadIcon } from '../../assets/download.svg'
import { ReactComponent as MailIconWhite } from '../../assets/mail.svg'
import { ReactComponent as PhoneIconWhite } from '../../assets/phone.svg'
import { ReactComponent as LocationIconWhite } from '../../assets/location.svg'
import { ReactComponent as WebsiteIconWhite } from '../../assets/website.svg'
import { ReactComponent as LinkedinIconWhite } from '../../assets/linkedin.svg'
import { ReactComponent as TwitterIconWhite } from '../../assets/twitter.svg'
import { ReactComponent as SkypeIconWhite } from '../../assets/skype.svg'
import { ReactComponent as FacebookIconWhite } from '../../assets/facebook.svg'
import { ReactComponent as GithubIconWhite } from '../../assets/github.svg'
import { ReactComponent as StackOverFlowIconWhite } from '../../assets/stackoverflow.svg'
import { ReactComponent as MediumIconWhite } from '../../assets/medium.svg'
import { ReactComponent as InstagramIconWhite } from '../../assets/instagram.svg'
import './icon.scss'

interface IconProps {
  className?: string
  iconType: string
  iconColorHex?: string
  onClick?: () => void
}

export const Icon = (props: IconProps) => {
  const { className, iconType, iconColorHex, onClick } = props

  const renderIcon = (type: string) => {
    switch (type) {
      case '1':
        return <EducationIcon />
      case '2':
        return <WorkExperienceIcon />
      case '3':
        return <OrganizationIcon />
      case '4':
        return <CertificateIcon />
      case '5':
        return <PersonalProjectIcon />
      case '6':
        return <AchievementIcon />
      case '7':
        return <ConferenceIcon />
      case '8':
        return <HonorAwardIcon />
      case '9':
        return <TeachingExperienceIcon />
      case '10':
        return <VolunteerIcon />
      case '11':
        return <SupportCauseIcon />
      case '12':
        return <LanguageIcon />
      case '13':
        return <PublicationIcon />
      case '14':
        return <SkillIcon />
      case '15':
        return <InterestIcon />
      case '16':
        return <SoftSkillIcon />
      case '17':
        return <ReferenceIcon />
      case 'add':
        return <AddIcon />
      case 'download':
        return <DownloadIcon />
      case 'bold':
        return <BoldIcon />
      case 'italic':
        return <ItalicIcon />
      case 'underline':
        return <UnderlineIcon />
      case 'move-up':
        return <MoveUpIcon />
      case 'move-down':
        return <MoveDownIcon />
      case 'trash':
        return <TrashIcon />
      case 'font':
        return <FontIcon />
      case 'theme':
        return <ThemeIcon />
      case 'template':
        return <TemplateIcon />
      case 'layout':
        return <LayoutIcon />
      case 'setting':
        return <SettingIcon />
      case 'email':
        return <MailIconWhite />
      case 'address':
        return <LocationIconWhite />
      case 'phoneNumber':
        return <PhoneIconWhite />
      case 'website':
        return <WebsiteIconWhite />
      case 'linkedIn':
        return <LinkedinIconWhite />
      case 'twitter':
        return <TwitterIconWhite />
      case 'skype':
        return <SkypeIconWhite />
      case 'facebook':
        return <FacebookIconWhite />
      case 'github':
        return <GithubIconWhite />
      case 'stackOverflow':
        return <StackOverFlowIconWhite />
      case 'medium':
        return <MediumIconWhite />
      case 'instagram':
        return <InstagramIconWhite />
      default:
        return <EducationIcon />
    }
  }

  return (
    <div
      className={`icon ${iconType} ${!Number(iconType) ? 'social' : ''} ${className || ''}`}
      style={{ backgroundColor: `${iconColorHex}` }}
      onClick={onClick}
      onKeyDown={onClick}
      role={'button'}
      tabIndex={0}
    >
      {renderIcon(iconType)}
    </div>
  )
}
