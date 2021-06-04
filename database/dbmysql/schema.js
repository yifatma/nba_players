const teamsTable = "create table if not exists teams (id INT(11) NOT NULL, \
    abbreviation VARCHAR(5) NOT NULL,  \
    city VARCHAR(40) NOT NULL, \
    conference VARCHAR(10)  NOT NULL, \
    division VARCHAR(10)  NOT NULL, \
    full_name VARCHAR(255) NOT NULL, \
    name VARCHAR(40) NOT NULL, \
    PRIMARY KEY(`id`)); "

const playersTable = "create table if not exists players (id INT(11) NOT NULL, \
    first_name VARCHAR(255) NOT NULL, \
    last_name VARCHAR(255) NOT NULL,  \
    position CHAR(1) NOT NULL, \
    height_feet INT, \
    height_inches INT, \
    weight_pounds INT, \
    team_id INT(11) NOT NULL,\
    PRIMARY KEY (`id`), \
    FOREIGN KEY (team_id) REFERENCES teams(id))"

const insetTeamRow = 'insert into teams (id,abbreviation,city,conference,division,full_name,name) values ?'
const insetPlayerRow = 'insert into players (id,first_name,last_name, position, height_feet, height_inches,weight_pounds,team_id) values ? '

const selectAllTeams = 'select * from teams'
const selectAllPlayers = 'select * from players'

const updateTeam = 'update teams set '
const updatePlayer = 'update players  \
                      set first_name =?, \
                        last_name=?,  \
                        position=?, \
                        height_feet=?, \
                        height_inches=?, \
                        weight_pounds=?, \
                        team_id=? \
                      where id=?'

module.exports = {
    teamsTable,
    playersTable,
    insetTeamRow,
    insetPlayerRow,
    selectAllTeams,
    selectAllPlayers,
    updatePlayer
}