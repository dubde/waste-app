export class PresetExamples {
  static readonly development = `<?xml version="1.0"?>
  <Preset>
  <PresetName>Development</PresetName>
  <Required>
    <add key="DevelopmentUserLogin" value="DEFENDERI0061@yopmail.com" />
    <add key="IsInDevelopment" value="true" />
  </Required>
  </Preset>`;

  static readonly login = `<?xml version="1.0"?>
  <Preset>
  <PresetName>Login</PresetName>
  <Required>
    <add key="DevelopmentUserLogin" value="DEFENDERI0061@yopmail.com" />
  </Required>
  </Preset>`;

  static readonly developmentWithout = `<?xml version="1.0"?>
  <Preset>
  <PresetName>NoValues</PresetName>
  <Required>
    <add key="DevelopmentUserLogin" value="" />
    <add key="IsInDevelopment" value="" />
  </Required>
  </Preset>`;

  static editable = `<?xml version="1.0"?>
  <Preset>
  <PresetName>Editable</PresetName>
  <Required>
    <add key="DevelopmentUserLogin" value="" />
    <add key="IsInDevelopment" value="" />
  </Required>
  </Preset>`;

  static presetList = [
    PresetExamples.development,
    PresetExamples.login,
    PresetExamples.developmentWithout,
    PresetExamples.editable
  ];
}
