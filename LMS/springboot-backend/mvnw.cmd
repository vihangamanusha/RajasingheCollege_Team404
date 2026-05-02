@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET %%x=

@setlocal

@SET MAVEN_PROJECTBASEDIR=%~dp0
@IF "%MAVEN_PROJECTBASEDIR:~-1%"=="\" SET MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

@SET MVNW_REPOURL=
@SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

@FOR /F "usebackq tokens=1,2 delims==" %%A IN ("%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties") DO (
    @IF "%%A"=="distributionUrl" SET DISTRIBUTION_URL=%%B
)

@SET JAVA_HOME_SUFFIX=
@IF "%JAVA_HOME%"=="" (
  @FOR /F "usebackq tokens=*" %%F IN (`where java 2^>nul`) DO (
    @SET JAVA_EXE=%%F
    @GOTO foundJava
  )
) ELSE (
  @SET JAVA_EXE=%JAVA_HOME%/bin/java.exe
)
:foundJava

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
@SET MVN_CMD="%JAVA_EXE%" -jar %WRAPPER_JAR% %WRAPPER_LAUNCHER% %*
%MVN_CMD%
@IF %ERRORLEVEL% NEQ 0 GOTO error
@GOTO end
:error
@EXIT /B %ERRORLEVEL%
:end
@ENDLOCAL
