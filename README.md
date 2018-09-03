# React-Discord-Widget

Discord Widget, written with React. Gets data from Discord JSON API with server's id.

You can change the link in **discord.js** to use it for your own server.

```javascript
axios.get('https://discordapp.com/api/guilds/{serverid}/widget.json')
      .then(resp => {
        this.setState({ data: resp.data })
        console.log(this.state.data)
      })
```
