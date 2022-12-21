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
import { ReactComponent as UploadIcon } from '../../assets/upload.svg'

import MailIconWhite from '../../assets/mail-white.png'
import PhoneIconWhite from '../../assets/phone-white.png'
import LocationIconWhite from '../../assets/location-white.png'
import WebsiteIconWhite from '../../assets/website-white.png'
import LinkedinIconWhite from '../../assets/linkedin-white.png'
import TwitterIconWhite from '../../assets/twitter-white.png'
import SkypeIconWhite from '../../assets/skype-white.png'
import FacebookIconWhite from '../../assets/facebook-white.png'
import GithubIconWhite from '../../assets/github-white.png'
import StackOverFlowIconWhite from '../../assets/stackoverflow-white.png'
import MediumIconWhite from '../../assets/medium-white.png'
import InstagramIconWhite from '../../assets/instagram-white.png'

import MailIconBlack from '../../assets/mail-black.png'
import PhoneIconBlack from '../../assets/phone-black.png'
import LocationIconBlack from '../../assets/location-black.png'
import WebsiteIconBlack from '../../assets/website-black.png'
import LinkedinIconBlack from '../../assets/linkedin-black.png'
import TwitterIconBlack from '../../assets/twitter-black.png'
import SkypeIconBlack from '../../assets/skype-black.png'
import FacebookIconBlack from '../../assets/facebook-black.png'
import GithubIconBlack from '../../assets/github-black.png'
import StackOverFlowIconBlack from '../../assets/stackoverflow-black.png'
import MediumIconBlack from '../../assets/medium-black.png'
import InstagramIconBlack from '../../assets/instagram-black.png'

import { profileInitialState } from 'src/stories/pages/DocumentList/documentList.slice'
import './icon.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { TemplateType } from 'src/types/Template'

interface IconProps {
  className?: string
  iconType: string
  iconColorHex?: string
  isSocialIcon?: boolean
  onClick?: () => void
}

export const Icon = (props: IconProps) => {
  const { className, iconType, iconColorHex, isSocialIcon, onClick } = props
  const template = useSelector((state: RootState) => state.template.currentTemplate)

  const renderIcon = (type: string) => {
    if (isSocialIcon) {
      if (
        template === TemplateType.skilled_based ||
        template === TemplateType.functional ||
        template === TemplateType.tech ||
        template === TemplateType.simple ||
        template === TemplateType.it
      ) {
        //white icon
        switch (type) {
          case 'email':
            return <img src={MailIconWhite} alt="" />
          case 'address':
            return <img src={LocationIconWhite} alt="" />
          case 'phone':
            return <img src={PhoneIconWhite} alt="" />
          case 'website':
            return <img src={WebsiteIconWhite} alt="" />
          case 'linkedIn':
            return <img src={LinkedinIconWhite} alt="" />
          case 'twitter':
            return <img src={TwitterIconWhite} alt="" />
          case 'skype':
            return <img src={SkypeIconWhite} alt="" />
          case 'facebook':
            return <img src={FacebookIconWhite} alt="" />
          case 'gitHub':
            return <img src={GithubIconWhite} alt="" />
          case 'stackOverflow':
            return <img src={StackOverFlowIconWhite} alt="" />
          case 'medium':
            return <img src={MediumIconWhite} alt="" />
          case 'instagram':
            return <img src={InstagramIconWhite} alt="" />
          default:
            return <img src={MailIconWhite} alt="" />
        }
      } else {
        //black icon
        switch (type) {
          case 'email':
            return <img src={MailIconBlack} alt="" />
          case 'address':
            return <img src={LocationIconBlack} alt="" />
          case 'phone':
            return <img src={PhoneIconBlack} alt="" />
          case 'website':
            return <img src={WebsiteIconBlack} alt="" />
          case 'linkedIn':
            return <img src={LinkedinIconBlack} alt="" />
          case 'twitter':
            return <img src={TwitterIconBlack} alt="" />
          case 'skype':
            return <img src={SkypeIconBlack} alt="" />
          case 'facebook':
            return <img src={FacebookIconBlack} alt="" />
          case 'gitHub':
            return <img src={GithubIconBlack} alt="" />
          case 'stackOverflow':
            return <img src={StackOverFlowIconBlack} alt="" />
          case 'medium':
            return <img src={MediumIconBlack} alt="" />
          case 'instagram':
            return <img src={InstagramIconBlack} alt="" />
          default:
            return <img src={MailIconBlack} alt="" />
        }
      }
    } else
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
        case 'upload':
          return <UploadIcon />
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
        default:
          return <EducationIcon />
      }
  }

  const getSocialStyle = () => {
    if (!Number(iconType) && Object.keys(profileInitialState).includes(iconType)) {
      return 'social'
    }
    return ''
  }

  return (
    <div
      className={`icon ${iconType} ${getSocialStyle()} ${className || ''}`}
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
