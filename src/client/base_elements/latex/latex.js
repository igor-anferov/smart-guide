import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import { parse, HtmlGenerator } from 'latex.js';

import commonStyles from '../../styles';
import LatexEditor from './editor';
import VerifiedTextField from '../../verified-text-field';
import ApiContext from '../../api';


const drawerWidth = 320;

const styles = theme => ({
  ...commonStyles(theme),

  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  mainExpanded: {
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainReduced: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class LaTeX extends React.Component {
  state = {
    title: '',
    titleError: '',
    source: '',
    sourceError: '',
    is_pivotal: false,
    latex: '',
    latexError: false,
    timeToRender: undefined,
    open: true,
  }

  constructor(props) {
    super(props)
    this.doRender = this.doRender.bind(this)
    this.handleCodeChanged = this.handleCodeChanged.bind(this)
    this.handleDrawer = this.handleDrawer.bind(this)
    this.clearCodeErrorMessage = this.clearCodeErrorMessage.bind(this)
    this.showCodeErrorMessage = this.showCodeErrorMessage.bind(this)
    this.submit = this.submit.bind(this)
  }

  doRender() {
    var iframe = document.getElementById('preview')
    const success = compile(this.state.latex, iframe)
    this.setState({
      latexError: !success
    })
    iframe.contentDocument.dispatchEvent(new Event('change'))
    return success
  }

  handleDrawer() {
    this.setState({ open: !this.state.open })
  }

  clearCodeErrorMessage(event, reason) {
    if (reason === 'clickaway')
      return
    this.setState({
      showCodeErrorMessage: false,
    })
  }

  showCodeErrorMessage(msg) {
    this.setState({
      showCodeErrorMessage: true,
      latexErrorMessage: msg
    })
  }

  handleCodeChanged(latex, delay=300) {
    this.setState({ latex })
    if (this.state.timeToRender)
      clearTimeout(this.state.timeToRender);
    this.setState({
      timeToRender:
        setTimeout(() => {
          this.setState({ timeToRender: undefined })
          this.doRender()
        }, delay)
    })
  }

  async componentDidMount() {
    const base_element_id = this.props.match.params ? this.props.match.params.base_element_id : undefined

    if (!base_element_id)
      return

    const API = this.context;

    const [info, content] = await Promise.all([
      API.request(`/base_elements/${base_element_id}/info`),
      API.request(`/base_elements/${base_element_id}/content`),
    ])

    if (!info.ok || !content.ok)
      throw Error('Failed to load LaTeX base element')

    const [json, body] = await Promise.all([
      info.json(),
      content.text(),
    ])

    if (json.type !== 'latex')
      throw Error(`Unexpected type [${json.type}] on LaTeX base element editing`)

    const state = {
      title: json.title,
      source: json.source,
      is_pivotal: json.is_pivotal,
      latex: body,
    }

    this.setState({
      initialState: state,
      ...state
    })

    this.handleCodeChanged(body, 0)
  }

  async submit() {
    if (!this.state.title)
      this.setState({ titleError: 'Заполните это поле'})
    if (!this.state.source)
      this.setState({ sourceError: 'Заполните это поле'})
    if (!this.state.latex)
      this.showCodeErrorMessage('Нельзя сохранить пустой базовый элемент')
    if (!this.doRender())
      this.showCodeErrorMessage('Нельзя сохранить невалидный LaTeX')
    if (!this.state.title || !this.state.source || !this.state.latex || this.state.latexError)
      return;

    const base_element_id = this.props.match.params ? this.props.match.params.base_element_id : undefined

    let to_be_uploaded = {
      title: this.state.title,
      source: this.state.source,
      is_pivotal: this.state.is_pivotal,
      latex: this.state.latex,
    }

    if (this.state.initialState)
      for (const [k, v] of Object.entries(this.state.initialState))
        if (v === to_be_uploaded[k])
          delete to_be_uploaded[k]

    if (Object.entries(to_be_uploaded).length) {
      let body = new FormData()
      for (const [k, v] of Object.entries(to_be_uploaded))
        body.append(k, v)

      const API = this.context;
      const results = await API.request(
        base_element_id ?
          `/base_elements/${base_element_id}` :
          `/clipboard/base_elements`,
        {
          method: 'POST',
          body: body,
        }
      )

      if (!results.ok)
        throw Error(`Unexpected latex upload status ${results.status}`);
    }
    this.props.history.goBack();
  }

  render() {
    const base_element_id = this.props.match.params ? this.props.match.params.base_element_id : undefined
    const { classes } = this.props

    return (
      <Box height={1}>
        <CssBaseline />
        <Snackbar open={this.state.showCodeErrorMessage} autoHideDuration={4000} onClose={this.clearCodeErrorMessage}>
          <Alert
            elevation={6}
            variant="filled"
            onClose={this.clearCodeErrorMessage}
            severity="error"
          >
            {this.state.latexErrorMessage}
          </Alert>
        </Snackbar>
        <Fab className={classes.fab} onClick={this.submit} color="primary">
          <DoneIcon />
        </Fab>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.state.handleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Box p={2}>
            <Box py={2}>
              <VerifiedTextField
                autoFocus
                margin="dense"
                label="Название элемента"
                required
                multiline
                fullWidth
                value={this.state.title}
                onChange={title => this.setState({title})}
                error={this.state.titleError}
                onErrorChange={titleError => this.setState({titleError})}
              />
            </Box>
            <Box py={2}>
              <VerifiedTextField
                margin="dense"
                label="Источник"
                required
                multiline
                fullWidth
                value={this.state.source}
                onChange={source => this.setState({source})}
                error={this.state.sourceError}
                onErrorChange={sourceError => this.setState({sourceError})}
              />
            </Box>
            <Box py={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.is_pivotal}
                    onChange={event => this.setState({is_pivotal: event.target.checked})}
                    color="primary"
                  />
                }
                label="Отображать в теормине"
              />
            </Box>
          </Box>
        </Drawer>
        <Box
          className={clsx(classes.flexCol, classes.mainExpanded, {
            [classes.mainReduced]: this.state.open,
          })}
        >
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.state.handleDrawer}
                edge="start"
                className={clsx(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>{
                base_element_id ?
                  'Редактирование базового элемента — LaTeX' :
                  'Новый базовый элемент — LaTeX'
              }</Typography>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.flexGrow}>
            <Grid item xs={6} className={classes.fullHeight}>
              <LatexEditor value={this.state.latex} onChange={this.handleCodeChanged}/>
            </Grid>
            <Grid item xs={6} className={classes.fullHeight}>
              <Box
                component='iframe'
                id="preview"
                sandbox="allow-same-origin allow-scripts"
                width={1}
                height={1}
                border={0}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

LaTeX.contextType = ApiContext;

export default withStyles(styles, { withTheme: true })(LaTeX)

var en = require('hyphenation.en-us')
var ru = require('hyphenation.ru')

var generator = new HtmlGenerator({
    hyphenate: true,
    languagePatterns: [en, ru],
})

var scrollY = 0

function links() {
    var as = document.getElementsByTagName("a")
    for (var i = 0; i < as.length; i++) {
        if (as[i].getAttribute("href").startsWith("#")) {
            as[i].addEventListener("click", function(ev) {
                ev.preventDefault()
                var target = ev.target.getAttribute("href").substr(1)
                var te = document.getElementById(target)

                document.scrollingElement.scrollTop = offsetTop(te)
            })
        }
    }
}

/* function to compile latex source into the given iframe */
function compile(latex, iframe) {
    var doc = iframe.contentDocument

    if (doc.readyState !== "complete")
        return

    try {
        generator.reset()
        const gen = parse(latex, { generator: generator })
        let newDoc = document.implementation.createHTMLDocument(gen.documentTitle);
        let charset = document.createElement("meta")
        charset.setAttribute("charset", "UTF-8")
        newDoc.head.appendChild(charset)
        let el = document.createDocumentFragment()
        for (let s of [
          // eslint-disable-next-line import/no-webpack-loader-syntax
          require('!!css-loader!latex.js/dist/css/article.css').toString(),
          // eslint-disable-next-line import/no-webpack-loader-syntax
          require('!!css-loader!latex.js/dist/css/katex.css').toString(),
        ]) {
          let style = document.createElement("style")
          style.innerHTML = s
          style.type = "text/css"
          el.appendChild(style)
        }

        for (let s of [
          // eslint-disable-next-line import/no-webpack-loader-syntax
          require('!!raw-loader!latex.js/dist/js/base.js').default,
        ]) {
          let script = document.createElement("script")
          script.innerHTML = s
          el.appendChild(script)
        }

        newDoc.head.appendChild(el)

        newDoc.body.appendChild(gen.domFragment())
        gen.applyLengthsAndGeometryToDom(newDoc.documentElement)

        // we need to disable normal processing of same-page links in the iframe
        // see also https://stackoverflow.com/questions/50657574/iframe-with-srcdoc-same-page-links-load-the-parent-page-in-the-frame
        var linkScript = newDoc.createElement('script')
        linkScript.text = ''
        for (const event of ['DOMContentLoaded', 'change'])
          linkScript.text += `document.addEventListener("${event}", ${links.toString()});`
        newDoc.head.appendChild(linkScript)

        // don't reload all the styles and fonts if not needed!
        // eslint-disable-next-line
        if (doc.head.innerHTML == newDoc.head.innerHTML) {
            var newBody = doc.adoptNode(newDoc.body)
            doc.documentElement.replaceChild(newBody, doc.body)
            doc.documentElement.style.cssText = newDoc.documentElement.style.cssText
        } else {
            iframe.srcdoc = newDoc.documentElement.outerHTML

            // var blob = new Blob([newDoc.documentElement.innerHTML], {type : 'text/html'});
            // iframe.src = URL.createObjectURL(blob);
        }

        if (scrollY) {
            iframe.contentWindow.scrollTo(0, scrollY)
            scrollY = 0
        }

        return true
    } catch (e) {
        console.error(e)

        // save scrolling position and restore on next successful compile
        if (!scrollY)
            scrollY = iframe.contentWindow.pageYOffset

        var error = {
            line:     definedOrElse(e.location.start.line, 0),
            column:   definedOrElse(e.location.start.column, 0),
            message:  e.message,
            found:    definedOrElse(e.found, ""),
            expected: definedOrElse(e.expected, ""),
            location: excerpt(latex, definedOrElse(e.location.start.offset, 0))
        };

        doc.body.innerHTML = '<pre class="error">ERROR: Parsing failure:\n\n' + errorMessage(error, true) + '</pre>'

        return false
    }
}


function definedOrElse(value, fallback) {
    return (typeof value !== "undefined" ? value : fallback);
};


/* utility function: create a source excerpt */
function excerpt(txt, o) {
    var l = txt.length;
    var b = o - 20; if (b < 0) b = 0;
    var e = o + 20; if (e > l) e = l;
    var hex = function (ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    };
    var extract = function (txt, pos, len) {
        return txt.substr(pos, len)
        .replace(/\\/g,   "\\\\")
        // eslint-disable-next-line
        .replace(/\x08/g, "\\b")
        .replace(/\t/g,   "\\t")
        .replace(/\n/g,   "\\n")
        .replace(/\f/g,   "\\f")
        .replace(/\r/g,   "\\r")
        // eslint-disable-next-line
        .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return "\\x0" + hex(ch); })
        // eslint-disable-next-line
        .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return "\\x"  + hex(ch); })
        .replace(/[\u0100-\u0FFF]/g,         function(ch) { return "\\u0" + hex(ch); })
        .replace(/[\u1000-\uFFFF]/g,         function(ch) { return "\\u"  + hex(ch); });
    };
    return {
        prolog: extract(txt, b, o - b),
        token:  extract(txt, o, 1),
        epilog: extract(txt, o + 1, e - (o + 1))
    };
}


/* render a useful error message */
function errorMessage(e, noFinalNewline) {
    var l = e.location;
    var prefix1 = "line " + e.line + " (column " + e.column + "): ";
    var prefix2 = "";
    for (var i = 0; i < prefix1.length + l.prolog.length; i++)
        prefix2 += "-";
    var msg = prefix1 + l.prolog + l.token + l.epilog + "\n" + prefix2 + "^\n" + e.message + (noFinalNewline ? "" : "\n");

    return msg;
};

function _vertical(el, tb) {
    var doc, docEl, rect, win;

    // return zero for disconnected and hidden (display: none) elements, IE <= 11 only
    // running getBoundingClientRect() on a disconnected node in IE throws an error
    if ( !el.getClientRects().length ) {
        return 0;
    }

    rect = el.getBoundingClientRect();

    doc = el.ownerDocument;
    docEl = doc.documentElement;
    win = doc.defaultView;

    return rect[tb] + win.pageYOffset - docEl.clientTop;
}


function offsetTop(el) {
    return _vertical(el, "top");
}
