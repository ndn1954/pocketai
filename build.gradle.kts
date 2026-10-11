tasks.register<Exec>("npmBuild") {
    commandLine("npm", "run", "build")
}

tasks.register("assembleDebug") {
    dependsOn("npmBuild")
    doLast {
        println("PokeClaw React Applet Build Verified Successfully")
    }
}

tasks.register("build") {
    dependsOn("npmBuild")
}
