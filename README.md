# Tic-Tac-Toe-Game
**TECHNICAL DOCUMENTS RELATED TO PROJECT ARE ADDED AS A PDF FILE**.

*Click here to play game* - [PLAY TIC-TAC TOE](https://prasenjit07.github.io/Tic-Tac-Toe-Game/)

This project was done under **Engage'2020** conducted by **Microsoft**.
Built an **unbeatable AI** Tic Tac Toe game using **minimax algorithm**.
We optimized the algorithm using **alpha-beta pruning**.
Alpha-beta pruning belongs to the **branch and bound** category.
* By using this we were able to *reduce* the **time complexity** as some branches of the tree can be eliminated using alpha beta pruning.
* Appropriate **heuristics** values were chosen for the code.
* Game has various **levels** given in the form of depths.
* Used **functional paradigm** for the code
* **Two human player** feature was also added.
## **Features** given below coming soon
* *USING REINFORCEMENT LEARNING FOR TIC-TAC TOE GAME*
* Explored **Monte-Carlo tree search** as an alternative approach for building Tic Tac Toe Game. Monte-Carlo tree search ia a search technique in AI.It is a **probability and heuristics** driven search algorithm that combines the classic tree search implementations along **machine learning** principles of **reinforcement learning**.
* Predicting next move feature - Using **Q-Learning** algorithm agent can be taught how to play the Tic Tac Toe game.
* **Training phase** can be described by the pseudocode of Q-learning algorithm
```-Initialise: Q(s,a) = 0, starting state s, 
   starting player P, iterations N
   for t = 0 : N
   With probability ε : P picks random action a
   Else, pick action a that maximise Q(s,a)
   Observe new state ŝ and reward R(s,a)
   If current player is our agent, 
   update Q(s,a) = (1-α)Q(s,a) + α[R(s,a) + γ*max(Q(ŝ,â))]
   s = ŝ
   Switch turn, P = the other player```
   
