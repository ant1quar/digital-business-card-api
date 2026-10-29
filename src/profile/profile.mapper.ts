import { Profile as ProfileEntity } from '@prisma/client';
import { ProfileLink } from '../common/graphql/profile-link.model';
import { Profile } from './models/profile.model';

export function mapProfileLinks(entity: ProfileEntity): ProfileLink[] {
  const links: ProfileLink[] = [];
  if (entity.githubUrl) {
    links.push({ label: 'GitHub', url: entity.githubUrl });
  }
  if (entity.linkedInUrl) {
    links.push({ label: 'LinkedIn', url: entity.linkedInUrl });
  }
  links.push({ label: 'Email', url: `mailto:${entity.email}` });
  return links;
}

export function mapProfile(entity: ProfileEntity): Profile {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    location: entity.location,
    email: entity.email,
    links: mapProfileLinks(entity),
    skills: [],
    experience: [],
    projects: [],
  };
}
