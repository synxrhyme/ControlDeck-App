Invoke-WebRequest -UseBasicParsing -Uri 'https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe' -OutFile "./python-3.11.0-amd64.exe"

Start-Sleep -Seconds 5

.\python-3.11.0-amd64.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0

Start-Sleep -Seconds 5

setx /M path "%path%;C:\Program Files\Python311\"

Start-Sleep -Seconds 5

$env:PATH =$env:PATH+";C:\Program Files\Python311\"