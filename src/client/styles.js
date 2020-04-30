export default theme => ({
  fullWidth: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
  },
  fullHeight: {
    height: '100%',
    maxHeight: '100%',
    minHeight: '100%',
  },
  flexRow: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
  },
  flexCol: {
    display: 'flex',
    'flex-direction': 'column',
    height: '100%',
    maxHeight: '100%',
    minHeight: '100%',
  },
  flexGrow: {
    'min-height': 0,
    'min-width': 0,
    flex: '1 1 0',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
});
