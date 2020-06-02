interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTampleteDTO {
  template: string;
  variables: ITemplateVariables;
}
