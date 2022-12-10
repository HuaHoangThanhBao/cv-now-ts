import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Avatar } from '../stories/atoms/Avatar/Avatar';
import { ProfileInfo } from '../stories/molecules/ProfileInfo';
import { ProfileSocial } from '../stories/molecules/ProfileSocial';
import { Profile } from '../stories/organisms/Profile';
import { TemplateType } from '../types/Template';

interface TransformProfileProps {
  template: string;
}

export const useTransformProfile = ({
  template,
}: TransformProfileProps): [
  (pageI: number, columnI: number) => JSX.Element | JSX.Element[] | ReactNode | ReactNode[],
  (pageI: number, columnI: number) => JSX.Element | JSX.Element[] | ReactNode | ReactNode[],
  (pageI: number, columnI: number) => JSX.Element | JSX.Element[] | ReactNode | ReactNode[],
  (pageI: number) => JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
] => {
  const isOneColumn = useSelector((state: RootState) => state.block.isOneColumn);
  const renderProfileAvatar = (pageI: number, columnI: number) => {
    if (pageI > 0) return null;
    if (
      (template !== TemplateType.skilled_based &&
        template !== TemplateType.functional &&
        template !== TemplateType.minimalist) ||
      isOneColumn
    )
      return null;
    return <Avatar />;
  };

  const renderProfileInfo = (pageI: number, columnI: number) => {
    if (pageI > 0) return null;
    if (isOneColumn) return null;
    else if (
      template === TemplateType.minimalist ||
      template === TemplateType.skilled_based ||
      template === TemplateType.functional
    )
      return <ProfileInfo />;
  };

  const renderProfileSocial = (pageI: number, columnI: number) => {
    if (pageI > 0) return null;
    if (isOneColumn) return null;
    if (
      (template === TemplateType.functional && columnI === 0) ||
      ((template === TemplateType.minimalist || template === TemplateType.skilled_based) &&
        columnI === 1)
    )
      return <ProfileSocial />;
    return null;
  };

  const renderProfile = (pageI: number) => {
    if (pageI > 0) return null;
    if (
      (template !== TemplateType.skilled_based &&
        template !== TemplateType.functional &&
        template !== TemplateType.minimalist) ||
      isOneColumn
    )
      return <Profile />;
    return null;
  };

  return [renderProfileAvatar, renderProfileInfo, renderProfileSocial, renderProfile];
};
