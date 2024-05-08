package client

const (
	BlockSubscriber = "block_subscriber"
	TxSubscriber    = "tx_subscriber"
)


func TMClient(nodeUris []string) {
	// var client *tmclient.HTTP
	// for _, nodeUri := range nodeUris {
	// 	var err error
	// 	client, err = tmclient.New(nodeUri, "/websocket")
	// 	if err != nil {
	// 		// logger.Error("failed to connect websocket", "uri", nodeUri, "err", err.Error())
	// 		continue
	// 	}
	// 	err = client.Start()
	// 	if err != nil {
	// 		// logger.Error("failed to start websocket client", "err", err.Error())
	// 		continue
	// 	}
	// 	// logger.Info("👍 connect to websocket", "uri", nodeUri)
	// 	return client
	// }
	// defer func() {
	// 	unsubscribeList := []string{BlockSubscriber, TxSubscriber}
	// 	for _, subscriber := range unsubscribeList {
	// 		if err := client.UnsubscribeAll(context.Background(), subscriber); err != nil {
	// 			// logger.Error("failed to Unsubscribe websocket client", "err", err.Error())
	// 			panic(err)
	// 		}
	// 	}

	// 	if err := client.Stop(); err != nil {
	// 		// logger.Error("failed to stop websocket client", "err", err.Error())
	// 		os.Exit(1)
	// 	}
	// }()

	// return client
}