const mineflayer = require("mineflayer");

const {pathfinder , movements , goals } = require("mineflayer-pathfinder")

const bot = mineflayer.createBot({

    host: "localhost",
    port: "59844",
    username: "Bot01",
    version: "1.17"
});

bot.loadPlugin(pathfinder)

function goto(x,y,z){
    const mcdata = require("minecraft-data")(bot.version)
    const movements = new movements(bot, mcdata)
    movements.scafoldingblocks = ["stone", "dirt", "cobblestone"]
    bot.pathfinder.setmovements(movements)
    if (z){
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y,z))
    }else {
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y))
    }

    if (y){
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y,z))
    }else {
        bot.pathfinder.setGoal(new goals.GoalBlock(x))
    }

    if (x){
        bot.pathfinder.setGoal(new goals.GoalBlock(x,y,z))
    }else {
        bot.pathfinder.setGoal(new goals.GoalBlock( ))
    };
};


bot.on("chat" , (username, message)=> {
if (username ===bot.username) return
if (message === "hallo"){
    bot.chat("Hey")
}
if (message === "!Leben"){
    bot.chat(`Meine Leben sind bei ${bot.health}/20!`)
}

    if(message.toLocaleLowerCase().startsWith(`go to `)){
    const coords = message.split(" ")
    goto(coords[2], coords[3], coords[4])
}
bot.chat(message)
})

