export class WebConfigMock {
  static readonly long =
    `
<?xml version="1.0"?>
<configuration>
  <configSections>
    <section name="sitecore" type="Sitecore.Configuration.ConfigReader, Sitecore.Kernel" />
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, Sitecore.Logging" />
  </configSections>
  <connectionStrings configSource="App_Config\ConnectionStrings.config" />
  <appSettings>
    <add key="DevelopmentUserLogin" value="DEFENDER61@yopmail.com" />
    <add key="IsInDevelopment" value="true" />
    <add key="" value="" />
    <add key="Login" value="https://subdomain.apigee.net/forgeock/oauth/v1/login" />
    <add key="Authentication" value="https://subdomain.apigee.net/forgrock/oauth/v1/user/{0}/passcode?consumerId={1}" />
  </appSettings>
  <sitecore configSource="App_Config\Sitecore.config" />
  <system.webServer>
    <modules runAllManagedModulesForAllRequests="true">
      <remove name="WebDAVModule" />
      <add type="Sitecore.DependencyInjection.SitecorePerRequestScopeModule, Sitecore.Kernel" name="" />
      <remove name="Session" />
      <add name="Session" type="System.Web.SessionState.SessionStateModule" preCondition="" />
      </modules>
    <handlers>
      <add name="WebDAVRoot" path="*" verb="OPTIONS,PROPFIND" modules="IsapiModule"
        scriptProcessor="" resourceType="Unspecified"
        preCondition="classicMode,runtimeVersionv4.0,bitness32" />
      <add verb="*" path="sitecore_speak.ashx" type="Sitecore.Resources.Scripts.ScriptHandler, Sitecore.Speak.Client" name="Sitecore.Speak" />
      <add verb="*" path="sitecore_expeditor_speak_request.ashx" type="Sitecore.ExperienceEditor.Speak.Server.RequestHandler, Sitecore.ExperienceEditor.Speak"
        name="Sitecore.ExperienceEditor.Speak" />
    </handlers>
    <validation validateIntegratedModeConfiguration="false" />
    <security>
      <requestFiltering>
        <requestLimits maxAllowedContentLength="524288000" />
      </requestFiltering>
    </security>
    <httpProtocol>
      <customHeaders>
        <remove name="X-Powered-By" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
  <system.web>
    <pages validateRequest="false">
      <controls>
        <add tagPrefix="sc" namespace="Sitecore.Web.UI.WebControls" assembly="Sitecore.Kernel" />
        <add tagPrefix="asp" namespace="System.Web.UI" assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
        <add tagPrefix="asp" namespace="System.Web.UI.WebControls"
          assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
        <add tagPrefix="sc" namespace="Sitecore.Web.UI.WebControls" assembly="Sitecore.Analytics" />
      </controls>
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="System.Linq" />
        <add namespace="System.Collections.Generic" />
      </namespaces>
    </pages>
    <membership defaultProvider="sitecore" hashAlgorithmType="SHA1">
      <providers>
        <clear />
        <add name="sitecore" type="Sitecore.Security.SitecoreMembershipProvider, Sitecore.Kernel" realProviderName="sql" providerWildcard="%"
          raiseEvents="true" />
        <add name="sql" type="System.Web.Security.SqlMembershipProvider" connectionStringName="core" applicationName="sitecore" minRequiredPasswordLength="1"
          minRequiredNonalphanumericCharacters="0" requiresQuestionAndAnswer="false" requiresUniqueEmail="false" maxInvalidPasswordAttempts="5" />
        <add name="switcher" type="Sitecore.Security.SwitchingMembershipProvider, Sitecore.Kernel" applicationName="sitecore"
          mappings="switchingProviders/membership" />
      </providers>
    </membership>
    <roleManager defaultProvider="sitecore" enabled="true">
      <providers>
        <clear />
        <add name="sitecore" type="Sitecore.Security.SitecoreRoleProvider, Sitecore.Kernel" realProviderName="sql" raiseEvents="true" />
        <add name="sql" type="System.Web.Security.SqlRoleProvider" connectionStringName="core" applicationName="sitecore" />
        <add name="switcher" type="Sitecore.Security.SwitchingRoleProvider, Sitecore.Kernel" applicationName="sitecore"
          mappings="switchingProviders/roleManager" />
      </providers>
    </roleManager>
    <profile defaultProvider="sql" enabled="true" inherits="Sitecore.Security.UserProfile, Sitecore.Kernel">
      <providers>
        <clear />
        <add name="sql" type="System.Web.Profile.SqlProfileProvider" connectionStringName="core" applicationName="sitecore" />
        <add name="switcher" type="Sitecore.Security.SwitchingProfileProvider, Sitecore.Kernel" applicationName="sitecore"
          mappings="switchingProviders/profile" />
      </providers>
      <properties>
        <clear />
        <add type="System.String" name="SC_UserData" />
      </properties>
    </profile>
    <compilation defaultLanguage="c#" debug="false" targetFramework="4.5.2">
      <assemblies>
        <add assembly="System.Web.Helpers, Version=3.0.0.0, Culture=neutral,PublicKeyToken=31BF3856AD364E35" />
        <add assembly="System.Web.Mvc, Version=5.2.3.0, Culture=neutral,PublicKeyToken=31BF3856AD364E35" />
        <add assembly="System.Web.WebPages, Version=3.0.0.0, Culture=neutral,PublicKeyToken=31BF3856AD364E35" />
      </assemblies>
    </compilation>
    <customErrors mode="RemoteOnly" />
    <authentication mode="None">
      <forms name=".ASPXAUTH" cookieless="UseCookies" />
    </authentication>
    <identity impersonate="false" />
    <trace enabled="false" requestLimit="50" pageOutput="false" traceMode="SortByTime" localOnly="true" />
    <sessionState mode="InProc" cookieless="false" timeout="20" sessionIDManagerType="Sitecore.SessionManagement.ConditionalSessionIdManager">
      <providers>
        <add name="mongo" type="Sitecore.SessionProvider.MongoDB.MongoSessionStateProvider, Sitecore.SessionProvider.MongoDB" sessionType="Standard"
          connectionStringName="session" pollingInterval="2" compression="true" />
      </providers>
    </sessionState>
    <globalization requestEncoding="utf-8" responseEncoding="utf-8" />
    <httpRuntime targetFramework="4.5.2" maxRequestLength="512000" executionTimeout="3600" enableKernelOutputCache="false" relaxedUrlToFileSystemMapping="true"
      requestValidationMode="4.0" enableVersionHeader="false" />
  </system.web>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="System.Web.Helpers" publicKeyToken="31bf3856ad364e35" />
        <bindingRedirect oldVersion="1.0.0.0-3.0.0.0" newVersion="3.0.0.0" />
      </dependentAssembly>
      <dependentAssembly>
        <assemblyIdentity name="System.Web.WebPages" publicKeyToken="31bf3856ad364e35" />
        <bindingRedirect oldVersion="1.0.0.0-3.0.0.0" newVersion="3.0.0.0" />
      </dependentAssembly>
      <dependentAssembly>
        <assemblyIdentity name="System.Web.Mvc" publicKeyToken="31bf3856ad364e35" />
        <bindingRedirect oldVersion="1.0.0.0-5.2.3.0" newVersion="5.2.3.0" />
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
  <system.serviceModel>
    <bindings>
      <basicHttpBinding>
        <binding name="SitecoreApplicationCenter" closeTimeout="00:01:00" openTimeout="00:01:00" receiveTimeout="00:20:00" sendTimeout="00:05:00"
          allowCookies="false" bypassProxyOnLocal="false" hostNameComparisonMode="StrongWildcard" maxBufferSize="65536" maxBufferPoolSize="524288"
          maxReceivedMessageSize="65536" messageEncoding="Text" textEncoding="utf-8" transferMode="Buffered" useDefaultWebProxy="true">
          <readerQuotas maxDepth="32" maxStringContentLength="8192" maxArrayLength="16384" maxBytesPerRead="4096" maxNameTableCharCount="16384" />
        </binding>
      </basicHttpBinding>
    </bindings>
  </system.serviceModel>
</configuration>
`;
}
