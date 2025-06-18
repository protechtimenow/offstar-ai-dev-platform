{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.python311Packages.virtualenv
    pkgs.nodePackages.typescript
    pkgs.nodePackages.ts-node
    pkgs.nodePackages.nodemon
    pkgs.nodePackages.vercel
    pkgs.curl
    pkgs.jq
    pkgs.git
    pkgs.docker
    pkgs.postgresql
    pkgs.redis
    pkgs.nginx
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
      pkgs.zlib
      pkgs.postgresql
    ];
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.stdenv.cc.cc.lib
      pkgs.zlib
      pkgs.glib
    ];
  };
}