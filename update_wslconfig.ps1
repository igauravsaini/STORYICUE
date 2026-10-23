$wslconfig = @"
[wsl2]
nestedVirtualization=true
memory=12GB
swap=8GB
"@
Set-Content -Path "$env:USERPROFILE\.wslconfig" -Value $wslconfig
Get-Content -Path "$env:USERPROFILE\.wslconfig"
