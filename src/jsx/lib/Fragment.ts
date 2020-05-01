export function Fragment(element: any) {
  return element.renderChildren().join('');
}
