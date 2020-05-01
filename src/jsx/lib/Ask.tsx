import * as jsx from '../../jsx';
jsx;

export function Ask(element: any) {
  return (
    <call>
      <fun>{element.renderChildren()}</fun>
    </call>
  );
}
