export class PresetExamples {
  static readonly development = `
  <?xml version="1.0"?>
  <PresetName>Development</PresetName>
  <Relevant>
    <add key="DevelopmentUserLogin" value="DEFENDERI0061@yopmail.com" />
    <add key="IsInDevelopment" value="true" />
  </Relevant>
  `;

  static readonly login = `
  <?xml version="1.0"?>
  <PresetName>Login</PresetName>
  <Relevant>
    <add key="DevelopmentUserLogin" value="DEFENDERI0061@yopmail.com" />
  </Relevant>
  `;

  static readonly developmentWithout = `
  <?xml version="1.0"?>
  <PresetName>NoValues</PresetName>
  <Relevant>
    <add key="DevelopmentUserLogin" value="" />
    <add key="IsInDevelopment" value="" />
  </Relevant>`;

  static editable = `
  <?xml version="1.0"?>
  <PresetName>Editable</PresetName>
  <Relevant>
    <add key="DevelopmentUserLogin" value="" />
    <add key="IsInDevelopment" value="" />
  </Relevant>`;

  static presetList = [
    PresetExamples.development,
    PresetExamples.login,
    PresetExamples.developmentWithout,
    PresetExamples.editable
  ];
}
