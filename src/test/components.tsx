import {ComponentType} from "react";

export function getAnyComponentMock<TProps = {}>(testId: string): ComponentType<TProps> {
  return (props) => <div data-testid={testId}/>;
}
