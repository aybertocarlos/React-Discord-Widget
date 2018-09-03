'use strict';

const e = React.createElement;

class discordWidget extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }


  componentDidMount() {
    axios.get('https://discordapp.com/api/guilds/223597502958534656/widget.json')
      .then(resp => {
        this.setState({ data: resp.data })
      })
  }

  render() {
    var channels
    var members
    var link
    var sname
    var mlength
    if (this.state.data !== null) {
      channels = this.state.data.channels.map(channel => {
        return e(
          'div',
          { key: channel.id, className: 'dc-channel dc-rounded dc-shadow' },
          e(
            'span',
            '',
            channel.name
          )
        )
      })
      members = this.state.data.members.map(member => {
        var mavatar = e(
          'img',
          { src: member.avatar ? 'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar : member.avatar_url, className: "dc-shadow" }
        )
        var mstatus
        switch (member.status) {
          case 'dnd':
            mstatus = e('div', { className: 'dc-status-inner dc-busy' })
            break
          case 'idle':
            mstatus = e('div', { className: 'dc-status-inner dc-idle' })
            break
          default:
            mstatus = e('div', { className: 'dc-status-inner dc-online' })
            break
        }
        var mbot = member.bot ? e('span', { className: 'dc-bot dc-rounded' }, 'BOT') : null
        var mname = e(
          'span',
          { className: 'left' },
          member.username
        )
        var mgame = member.game ? e(
          'span',
          { className: 'right' },
          member.game.name
        ) : null
        return e(
          'div',
          { key: member.id, className: "dc-member dc-rounded dc-shadow" },
          e('div', { className: 'dc-status' }, mstatus), mavatar, mname, mbot, mgame
        )
      })
      link = e('div', { className: 'dc-link' },
        e('span', '', 'Yandaki butona basarak sunucuya katıl.'),
        e('a', { className: 'dc-rounded dc-shadow', href: this.state.data.instant_invite }, 'Katıl'))
      sname = this.state.data.name
      mlength = this.state.data.members.length
    }

    var header = e('h1', { className: 'dc-main-header dc-rounded dc-shadow' }, sname + ' Discord')
    var header1 = e('h1', { className: 'dc-header' }, 'Kanallar')
    var header2 = e('h1', { className: 'dc-header' }, 'Çevrimiçi Üyeler - ' + mlength)
    var credit = e('span', { className: 'dc-credit' }, 'aybertocarlos')

    return (
      e(
        'div',
        { className: 'dc-container dc-rounded' },
        header, e('div', { className: 'dc-alt-container' }, header1, channels, header2, members), link, credit
      )
    )
  }
}




const domContainer = document.querySelector('#discord_widget');
ReactDOM.render(e(discordWidget), domContainer);