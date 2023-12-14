import { type LanguageResource } from '@app/i18n/types';

const transformation = (
  resource: LanguageResource,
  routeName: keyof LanguageResource
): Record<string, string> => {
  const routeResource = resource[routeName];
  const transformedResource: Record<string, string> = {};

  Object.keys(routeResource).forEach((key) => {
    transformedResource[`${routeName}.${key}`] = routeResource[key];
  });

  return transformedResource;
};

export default transformation;
