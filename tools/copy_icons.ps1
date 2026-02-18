$downloads = "$env:USERPROFILE\Downloads"
$res = "D:\Workplace\minecraft_words_apk-main\android-app\android\app\src\main\res"
$densities = @("mdpi","hdpi","xhdpi","xxhdpi","xxxhdpi")
foreach ($d in $densities) {
    $src = "$downloads\ic_launcher_$d.png"
    if (Test-Path $src) {
        Copy-Item $src "$res\mipmap-$d\ic_launcher.png" -Force
        Copy-Item $src "$res\mipmap-$d\ic_launcher_round.png" -Force
        Write-Host "Copied $d icons"
    } else {
        Write-Host "Not found: $src"
    }
}
Write-Host "Done!"
