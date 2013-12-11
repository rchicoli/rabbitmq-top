dispatcher_add(function(sammy) {
    sammy.get('#/top', function() {
            render({'top': {path:    '/top',
                            options: {sort:true}}},
                    'top', '#/top');
        });
    sammy.get('#/top/:pid', function() {
            render({'process': '/top/' + esc(this.params['pid'])},
                    'process', '#/top');
        });

});

NAVIGATION['Admin'][0]['Top'] = ['#/top', 'administrator'];

function link_pid(name) {
    return _link_to(name, '#/top/' + esc(name))
}

function fmt_process_name(process) {
    if (process == undefined) return '';
    var name = process.name;

    if (name.supertype != undefined) {
        if (name.supertype == 'channel') {
            return link_channel(name.connection_name + ' (' +
                                name.channel_number + ')');
        }
        else if (name.supertype == 'queue') {
            return link_queue(name.vhost, name.queue_name);
        }
        else if (name.supertype == 'connection') {
            return link_conn(name.connection_name);
        }
    }
    else {
        return '<b>' + name.name + '</b>';
    }
}

function fmt_remove_rabbit_prefix(name) {
    if (name == 'rabbit_amqqueue_process') return 'queue';

    if (name.substring(0, 7) == 'rabbit_') {
        return name.substring(7);
    }
    else {
        return name;
    }
}