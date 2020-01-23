import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import { parse, HtmlGenerator } from 'latex.js';

import LatexEditor from './latex/editor'

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    flex: 1,
  },
  flexBox: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
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
    marginLeft: -drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainReduced: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));


function DrawerContent() {
  const classes = useStyles();

  return (
    <Box display="flex" p={2}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TextField className={classes.flex} id="title" required={true} multiline={true} label="Название элемента" />
        </Grid>
        <Grid item xs={12}>
          <TextField className={classes.flex} id="source" multiline={true} label="Источник" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function LaTeX() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleCodeChanged = (code) => {
    var iframe = document.getElementById('preview')
    compile(code, iframe) 
    iframe.contentDocument.dispatchEvent(new Event('change'))
  };

  return (
    <div className={classes.flex}>
      <CssBaseline />
      <Fab className={classes.fab} color="primary">
        <DoneIcon />
      </Fab>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <DrawerContent/>
      </Drawer>
      <Grid container item xs direction='column' alignItems='stretch'
        className={clsx(classes.mainExpanded, {
          [classes.mainReduced]: open,
        })}
      >
        <Grid item>
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Новый базовый элемент — LaTeX
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container item xs alignItems="stretch">
          <Grid item xs={6}>
            <LatexEditor onChange={handleCodeChanged}/> 
          </Grid>
          <Grid item xs={6}>
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
      </Grid>
    </div>
  );
}


var en = require('hyphenation.en-us')
var ru = require('hyphenation.ru')

var generator = new HtmlGenerator({
    hyphenate: true,
    languagePatterns: [en, ru],
    styles: ['css/error.css']
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
        var newDoc = parse(latex, { generator: generator }).htmlDocument()
        console.log(newDoc)

        // we need to disable normal processing of same-page links in the iframe
        // see also https://stackoverflow.com/questions/50657574/iframe-with-srcdoc-same-page-links-load-the-parent-page-in-the-frame
        var linkScript = newDoc.createElement('script')
        linkScript.text = 'document.addEventListener("DOMContentLoaded", ' + links.toString() + ')'
        newDoc.head.appendChild(linkScript)

        // don't reload all the styles and fonts if not needed!
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
        .replace(/\x08/g, "\\b")
        .replace(/\t/g,   "\\t")
        .replace(/\n/g,   "\\n")
        .replace(/\f/g,   "\\f")
        .replace(/\r/g,   "\\r")
        .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return "\\x0" + hex(ch); })
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
    var msg = prefix1 + l.prolog + l.token + l.epilog + "\n" +
        prefix2 + "^" + "\n" +
        e.message + (noFinalNewline ? "" : "\n");

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
