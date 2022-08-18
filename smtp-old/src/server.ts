'use strict';

import { SMTPServer, SMTPServerDataStream } from 'smtp-server';
import { simpleParser } from "mailparser";
import {Message, Producer, QueueManager} from "redis-smq";
import { IConfig } from "redis-smq/dist/types";
import { RedisClientName } from "redis-smq-common/dist/types";
import {promisify, promisifyAll} from 'bluebird';

const config: IConfig = {
    namespace: 'fake_email',
    redis: {
        client: RedisClientName.REDIS_V4,
        options: {
            url: 'redis://localhost:6379',
        },
    },
    logger: {
        enabled: true,
        options: {
            level: 'info',
        },
    },
    messages: {
        store: false,
    },
};

const QueueManagerAsync = promisifyAll(QueueManager);
const producer = promisifyAll(new Producer());


const createQueue = async () => {
    const  queueManagerAsync = promisifyAll(
        await QueueManagerAsync.createInstanceAsync(config)
    );

    const queueAsync = promisifyAll(queueManagerAsync.queue);

    const exists = await queueAsync.existsAsync('emails');

    if (!exists) {
        await queueAsync.createAsync('emails', false);
    }
}

const produce = async (message: Message) => {
    await producer.runAsync();
    await producer.produceAsync(message);
}

async function serve(): Promise<void> {
    await createQueue();

    const smtp = new SMTPServer({
        disabledCommands: ['STARTTLS', 'AUTH'],
        logger: true,
        onData(stream, session, callback): void {
            (async () => {
                const simpleParserAsync = promisify(simpleParser);
                const parsedEmail = await simpleParserAsync(stream);

                const message = (new Message())
                    .setBody({
                        content: parsedEmail
                    })
                    .setQueue({
                        name: 'emails',
                        ns: 'fake_email',
                    })
                ;

                await produce(message);
            })()

            stream.on('end', callback);
        },
    });

    smtp.listen(1025);
}

serve().catch((err: Error) => console.log(err));