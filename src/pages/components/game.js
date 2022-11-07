import Board from "./board";
import React from "react";
import PopUp from "./pop_up";
import ButtonWithIcon from "./button_with_icon";

// Includes all the game logic
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.player_color = ["blue", "yellow", "red"];
        this.player_names = props.players;
        this.state = {
            player_turn: 1,
            step: 1,
            board: Array(24).fill(null),
            score: Array(3).fill(0),
            open_window: false
        }
    }

    // Determines which boxes are have been completed (all four sides have been filled)
    // Takes in game board (array) and index (position on game board that has been recently filled)
    // Returns indices of boxes (set in board) that have been completed so that they can be filled by a color
    calculateBoxFilled(board, index) {
        const winning_indices = [
            [0, 3, 4, 7],
            [1, 4, 5, 8],
            [2, 5, 6, 9],
            [7, 10, 11, 14],
            [8, 11, 12, 15],
            [9, 12, 13, 16],
            [14, 17, 18, 21],
            [15, 18, 19, 22],
            [16, 19, 20, 23]
        ]

        let indices = [];
        let box_filled = true;

        for (let i = 0; i < winning_indices.length; i++) {
            if (winning_indices[i].includes(index)) {
                for (let j = 0; j < winning_indices[i].length; j++) {
                    if (board[winning_indices[i][j]] === null) {
                        box_filled = false;
                    }
                }
                if (box_filled) {
                    indices.push(i);
                }
                box_filled = true;
            }
        }

        return indices;
    }

    // Method that updates game logic when a horizontal or vertical line has been clicked/completed
    // Takes in unique identifier (ID) assigned to all lines in board 
    handleClick(i) {
        if (this.state.board.at(i) !== null) {
            return;
        }

        // update line with player color
        const color = this.player_color[this.state.player_turn - 1]
        this.changeLineColor(i, color);

        // update game logic
        let board = this.state.board.slice();
        let score = this.state.score.slice();
        let open_window = false;
        board[i] = this.state.player_turn;
        const step = this.state.step + 1;
        const box_filled = this.calculateBoxFilled(board, i);
        let player_turn = this.state.player_turn;
        if (box_filled.length !== 0) {
            // fill in completed boxes with player color
            this.displayBoxColor(box_filled, color);
            // update score
            score[this.state.player_turn - 1] += box_filled.length;
        }
        else {
            player_turn = this.state.player_turn + 1;
            if (player_turn % 4 === 0) {
                player_turn = 1;
            }

        }
        if (step > 24){
            // open pop up window when game has been completed
            open_window = true;
        }
        // update state
        this.setState({
            player_turn: player_turn,
            step: step,
            board: board,
            score: score,
            open_window: open_window
        }
        )
    }

    // changes either vertical or horizontal line based on color passed in
    displayLineColor(color) {
        let css_h_line = ".h_line:hover{ background-color: " + color + " }";
        let css_v_line = ".v_line:hover{ background-color: " + color + " }";

        let style = document.createElement('style');

        style.appendChild(document.createTextNode(css_h_line));
        style.appendChild(document.createTextNode(css_v_line));

        document.getElementsByTagName('head')[0].appendChild(style);
    }

    // displays box color based on indice and color specified
    displayBoxColor(indices, color) {
        for (let i = 0; i < indices.length; i++) {
            let index = indices[i];
            if (document.getElementById("empty_box_" + index)) {
                document.getElementById("empty_box_" + index).style.backgroundColor = color;
            }
            else {
                let css = "#empty_box_" + index + "{ background-color: " + color + " }";
                let style = document.createElement('style');

                style.appendChild(document.createTextNode(css));
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        }

    }

    // resets boxes to default color
    resetBoxColors() {
        console.log("reset box colors")
        this.displayBoxColor([0, 1, 2, 3, 4, 5, 6, 7, 8], "black");
    }

    // changes specified line to specified color
    changeLineColor(index, color) {
        document.getElementById("line_" + index).style.backgroundColor = color;
    }

    // reset all line colors to default
    resetLineColors() {
        for (let i = 0; i < 24; i++) {
            document.getElementById("line_" + i).style.backgroundColor = null;
        }
    }

    // restarts game by resetting states
    restartGame() {
        this.setState({
            player_turn: 1,
            step: 1,
            board: Array(24).fill(null),
            score: Array(3).fill(0),
            open_window: false
        });
        this.resetLineColors();
        this.displayLineColor(this.player_color[this.state.player_turn - 1]);
        this.resetBoxColors();
    }

    // closes window by setting open_window state to false
    close_window() {
        const player_turn = this.state.player_turn;
        const step = this.state.step;
        const board = this.state.board;
        const score = this.state.score;
        this.setState({
            player_turn: player_turn,
            step: step,
            board: board,
            score: score,
            open_window: false
        })
    }

    render() {
        this.displayLineColor(this.player_color[this.state.player_turn - 1]);

        const empty_box_ids = [
            ["empty_box_0", "empty_box_1", "empty_box_2"],
            ["empty_box_3", "empty_box_4", "empty_box_5"],
            ["empty_box_6", "empty_box_7", "empty_box_8"]
        ]

        return (
            <div>
                <div className="center">
                    <p className="info_text"><b>Current turn:</b> {this.player_names[this.state.player_turn-1]}</p>
                    <p className="info_text">{this.player_names[0]}: {this.state.score[0]}</p>
                    <p className="info_text">{this.player_names[1]}: {this.state.score[1]}</p>
                    <p className="info_text">{this.player_names[2]}: {this.state.score[2]}</p>
                </div>
                <div className="button_div center padding_top_bottom">
                    <ButtonWithIcon type="back" onClick={() => this.props.nav()} />
                    <ButtonWithIcon type="replay" onClick={this.restartGame.bind(this)} />
                </div>
                <Board empty_box_ids={empty_box_ids} handleClick={this.handleClick.bind(this)} />
                <PopUp open_window={this.state.open_window} close_window={this.close_window.bind(this)} restart_game={this.restartGame.bind(this)} player_names={this.player_names} score={this.state.score}/>
            </div>
        );
    }
}

export default Game;