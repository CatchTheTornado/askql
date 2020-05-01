import * as jsx from './jsx';

export function Ref(element: any) {
  const { name } = element.props;
  jsx.assert(jsx.isString(name), 'name');
  return <ref>{name.split('.')}</ref>;
}
