import App                 from 'app';
import Menu                from 'menu';
import Util                from '../common/Util.js';
import MainMenu            from './MainMenu.js';
import DialogManager       from './DialogManager.js';
import { WindowTypes }     from './WindowManager.js';
import WindowManager       from './WindowManager.js';
import MusicMetadataReader from './model/MusicMetadataReader.js';

/**
 * Application entry point.
 */
class Main {
  /**
   * Initialize instance.
   */
  constructor() {
    // Compile switch
    global.DEBUG = true;
    if( DEBUG ) { Util.log( 'Initialize Application' ); }

    /**
     * IPC module for main process.
     * @type {ipcMain}
     */
    this.ipc = require( 'electron' ).ipcMain;

    /**
     * Manage the window.
     * @type {WindowManager}
     */
    this._windowManager = new WindowManager( this );

    /**
     * Manage the native dialog.
     * @type {DialogManager}
     */
    this._dialogManager = new DialogManager( this );

    /**
     * Read the metadata from music file.
     * @type {MusicMetadataReader}
     */
    this._musicMetadataReader = new MusicMetadataReader( this );
  }

  /**
   * Get the window manager.
   *
   * @return {WindowManager} Instance of the window manager.
   */
  get windowManager() {
    return this._windowManager;
  }

  /**
   * Occurs when a application launched.
   */
  onReady() {
    this._windowManager.show( WindowTypes.Main );

    const menu = Menu.buildFromTemplate( MainMenu.menu( this ) );
    Menu.setApplicationMenu( menu );
  }

  /**
   * Occurs when a window all closed.
   */
  onWindowAllClosed() {
    if( DEBUG ) { Util.log( 'Quit' ); }

    App.quit();
  }
}

const main = new Main();
App.on( 'ready', () => {
  if( DEBUG ) { Util.log( 'Application is ready' ); }
  main.onReady();
} );

App.on( 'quit', () => {
  if( DEBUG ) { Util.log( 'Application is quit' ); }
} );

App.on( 'window-all-closed', () => {
  if( DEBUG ) { Util.log( 'All of the window was closed.' ); }

  main.onWindowAllClosed();
} );
